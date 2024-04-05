import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
  return <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1 className={styles.title}>Welcome!</h1>
      <p className={styles.desc}>
        Here is Maria's WebHome 🐱
        Nice to meet you! 🌟
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Learn more</button>
        <button className={styles.button}>Contact me</button>
      </div>
      <div className={styles.brands}>
        <Image src="/brands.png" alt="" fill className={styles.brandImg}/>
      </div>
    </div>
      <div className={styles.imageContainer}>
          <Image src="/hero.gif" alt="" fill className={styles.heroImg}/>
      </div>
  </div>;
};

export default Home;