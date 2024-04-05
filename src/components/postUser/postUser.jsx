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
const PostUser = async ({ userID }) => {

    const userInfo = await getUser(userID);

    return (
        <div className={styles.container}>
            <span className={styles.title}>Author</span>
            <span className={styles.name}>{userInfo.name}</span>
            {/* <span className={styles.username}>{userInfo.username}</span> */}
        </div>
    );
}

export default PostUser;