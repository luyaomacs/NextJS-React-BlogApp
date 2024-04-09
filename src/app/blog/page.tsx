import type { Metadata } from "next";
import PostCard from "@/components/postcard/postcard";
import styles from "./blog.module.css";
import {searchParams} from 'next/navigation';
import {getPosts} from "@/lib/data"

export const metadata: Metadata = {
    title: "Blog",
    description: "Blog description",
};


// FETCH DATA WITH AN API
const getData = async () => {
    const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}}) //data fetch
    if(!res.ok){
        throw new Error("Failed to fetch data")
    }
    return res.json()
}

const BlogPage = async () => {
    // FETCH DATA WITH AN API
    const posts = await getData();

    // FETCH DATA WITHOUT AN API
    // const posts = await getPosts();

    // const mypost = {
    //     img: "https://images.pexels.com/photos/7945944/pexels-photo-7945944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     title: "Stones",
    //     body: "Just simply stones."
    // }

    return(
        <div className={styles.container}>
            {posts.map( (post) => (
                <div className={styles.post}>
                <PostCard post={post}/>
                </div>
            ))}
            {/* <div className={styles.post}>
                <PostCard post={post}/>
            </div>
            <div className={styles.post}>
                <PostCard post={post}/>
            </div>
            <div className={styles.post}>
                <PostCard post={post}/>
            </div>
            <div className={styles.post}>
                <PostCard post={post}/>
            </div> */}
        </div>
    );
};

export default BlogPage;
