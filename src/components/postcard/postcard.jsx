import styles from './postcard.module.css';
import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({post}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imageContainer}>
                <Image src={post.img} alt="" fill className={styles.image}/>            
                </div>
                <span className={styles.date}>01.01.2024</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.desc}>{post.body}</p>
                <Link className={styles.link} href={`/blog/${post.id}`}>READ MORE</Link>
            </div>
        </div>
    );
}

export default PostCard;