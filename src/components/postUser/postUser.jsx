import Image from "next/image";
import styles from "./postUser.module.css";
import { getUser } from "@/lib/data";

// FETCH DATA WITH AN API
// const getUser = async (userId) => {
//     // const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {next:{revalidate:3600}})
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {cache:"no-store"})

//     if(!res.ok){
//         throw new Error("Failed to fetch data")
//     }

//     return res.json()
// }


// input user id, return user info
const PostUser = async ({ userId }) => {

    const user = await getUser(userId);

    console.log("PostUser!!!")
    console.log(userId)

    return (
        <div className={styles.container}>
            <Image className={styles.avatar} 
                src={user.img ? user.img : "/noavatar.png"} alt="Avatar" width={50} height={50}/>
            <div className={styles.texts}>
            <span className={styles.title}>Author</span>
            <span className={styles.name}>{user.username}</span>
            </div>
        </div>
    );
}

export default PostUser;