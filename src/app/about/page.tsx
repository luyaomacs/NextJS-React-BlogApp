import type { Metadata } from "next";
import Image from "next/image";
import styles from "./about.module.css";

export const metadata: Metadata = {
    title: "About",
    description: "About description",
};


const AboutPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.subtitle}>About me</h2>
                <h1 className={styles.title}>I'm Maria, a Growing Software Developer o(=•ェ•=)</h1>
                <p className={styles.desc}>See what I'm recently developing ....</p>
                <div className={styles.boxes}>
                    <div className={styles.box}>
                        <h1>Number 1</h1>
                        <p>React</p>
                        <h1>Number 2</h1>
                        <p>NextJS</p>
                        <h1>Number 3</h1>
                        <p>Mongo DB</p>
                    </div>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <Image src="/about.png" alt="About Image" fill/>
            </div>
        </div>
    );
};

export default AboutPage;
