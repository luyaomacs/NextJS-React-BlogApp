import Image from "next/image";
import styles from "./singlepost.module.css";
import PostUser from "@/components/postuser/postuser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";


// FETCH DATA WITH AN API
// const getData = async (slug) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`, {next:{revalidate:3600}}) //data fetch

//     if(!res.ok){
//         throw new Error("Failed to fetch data")
//     }

//     return res.json()
// }


const SinglePostPage = async ({params}) => {

    const {slug} = params; // blog/params

    // FETCH DATA WITH AN API
    // const post = await getData(slug); // get the data that has id=slug

    // FETCH DATA WITHOUT AN API
    const post = await getPost(slug);

    return(
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image className={styles.img} src="/doggy.jpg" alt="Doggy" fill/>
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>
                    <Image className={styles.avatar} src="/pandas.jpg" alt="Pandas" width={50} height={50}/>
                    {post && (<Suspense fallback={<div>LoadingData...</div>}>
                        <PostUser userID={post.userId}/>
                    </Suspense>)}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {post.body}
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;
