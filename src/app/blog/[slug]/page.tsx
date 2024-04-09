import Image from "next/image";
import styles from "./singlepost.module.css";
import PostUser from "@/components/postuser/postuser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";


export const generateMetadata = async ({params}) => {
    const {slug} = params;
    const post = await getPost(slug);
    return {
        title: post.title,
        description: post.desc
    }
}


// FETCH DATA WITH AN API
const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {next:{revalidate:3600}}) //data fetch

    if(!res.ok){
        throw new Error("Failed to fetch data")
    }

    return res.json()
}


const SinglePostPage = async ({params}) => {

    const {slug} = params; // blog/params

    // FETCH DATA WITH AN API
    const post = await getData(slug); // get the data that has id=slug

    // FETCH DATA WITHOUT AN API
    // const post = await getPost(slug);

    console.log(post);

    return(
        <div className={styles.container}>
            {post.img && (
                <div className={styles.imgContainer}>
                <Image className={styles.img} src={post.img} alt="image" fill/>
                </div>
            )}
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>
                    {post && (
                        <Suspense fallback={<div>LoadingData...</div>}>
                        <PostUser userId={post.userId}/>
                        </Suspense>
                    )}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>{post.createdAt.toString().slice(4, 16)}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {post.desc}
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;
