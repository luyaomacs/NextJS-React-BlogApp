"use server"

import { revalidatePath } from "next/cache"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { signIn,signOut } from "./auth"
import bcrypt from "bcrypt"

export const addPost = async (prevState, formData) => {
    const {title, desc, userId, slug} = Object.fromEntries(formData)

    try{
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            userId,
            slug
        })

        await newPost.save()
        console.log("Saved to DB")
        revalidatePath("/blog") // when add a new post, it's gonna revaildate the blog page
        revalidatePath("/admin")
    } catch (error) {
        console.log(error)
        return {error: "Failed to add post"}
    }
}

export const deletePost = async (formData) => {

    const {id} = Object.fromEntries(formData) // delete by id

    try{
        connectToDb()
        await Post.findByIdAndDelete(id)
        console.log("Deleted from DB")
        revalidatePath("/blog") // when add a new post, it's gonna revaildate the blog page
        revalidatePath("/admin")
    } catch (error) {
        console.log(error)
        return {error: "Failed to delete post"}
    }
}

export const addUser = async (prevState, formData) => {
    const {username, email, password, img} = Object.fromEntries(formData);

    try{
        connectToDb()
        const user = await User.findOne({username})
        if(user){
            return {error: "Username already exists"}
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });
        await newUser.save();
        console.log("Saved to DB");
        revalidatePath("/admin");
    }catch(err){
        console.log(err);
        return {error: "Failed to register user"};
    }
}

export const deleteUser = async (formData) => {

    const {id} = Object.fromEntries(formData) // delete by id

    try{
        connectToDb()
        await Post.deleteMany({userId: id})
        await User.findByIdAndDelete(id)
        console.log("Deleted from DB")
        revalidatePath("/admin")
    } catch (error) {
        console.log(error)
        return {error: "Failed to delete user"}
    }
}

export const handleGithubLogin = async () => {
    await signIn("github");
};

export const handleLogout = async () => {
    await signOut("github");
};

export const register = async (previousState, formData) => { // called by useFormState
    const {username, email, password, img, passwordRepeat} = Object.fromEntries(formData);

    console.log({username, email, password, passwordRepeat});

    if(password !== passwordRepeat){
        return {error: "Passwords do not match"};
        // throw new Error("Passwords do not match");
    }

    try{
        connectToDb()
        const user = await User.findOne({username})
        if(user){
            return {error: "Username already exists"}
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });
        
        await newUser.save();
        console.log("Saved to DB");
        return {success: true};

    }catch(err){
        console.log(err);
        return {error: "Failed to register user"};
    }
}


export const login = async (previousState, formData) => {
    const {username, password } = Object.fromEntries(formData);
    console.log("Actually Logging in");
    try{
        await signIn("credentials", {username, password});
    }catch(err){
        console.log(err);
        if(err.message.includes("credentialssignin")){
            return {error: "Invalid username or password"};
        }
        throw err;
        // return {error: "Something went wrong!"};
        // throw new Error("Failed to login");
    }
}