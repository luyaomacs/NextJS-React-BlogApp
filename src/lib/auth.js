import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
    // console.log("Actually Using Credentials Login!!!");
    try{
        connectToDb();
        const user = await User.findOne({username: credentials.username});
        console.log(user)
        if(!user){
            throw new Error("Wrong Credentials");
        }

        // check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if(!isPasswordCorrect){
            throw new Error("Wrong Credentials");
        }

        return user;

    }catch(err){
        console.log(err)
        throw new Error("Failed to login");
        // return {error: "Failed to login"}
    }
}

export const { 
    handlers:{GET, POST}, 
    auth, 
    signIn, 
    signOut,
    } = NextAuth({ 
    ...authConfig,
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials){
                try{
                    const user = await login(credentials);
                    return user;
                }catch(err){
                    console.log(err);
                    return null;
                }
            }
        }),
    ],
    callbacks: { // match the login info with db
        async signIn({user, account, profile}) {
            // console.log(user, account, profile)
            if(account.provider === "github"){
                connectToDb()
                try{
                    const user = await User.findOne({email: profile.email})
                    if(!user){
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                        });
                        await newUser.save();
                    }
                }catch(err){
                    console.log(err)
                    return false
                }
            }
            return true
        },
        ...authConfig.callbacks,
    },
});

