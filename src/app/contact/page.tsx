import type { Metadata } from "next";
import Image from "next/image";
import styles from "./contact.module.css"

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact description",
};


const ContactPage = () => {
    const a = Math.random()
    console.log(a)

    return(
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src="/contact.png" alt="Contact Image" fill className={styles.img}/>
            </div>
            <div className={styles.formContainer}>
            <form className={styles.form}>
                <input type="text" placeholder="Name and Surname" />
                <input type="email" placeholder="Email Address" />
                <input type="text" placeholder="Phone Number (Optional)" />
                <textarea name="" id="" cols={30} rows={10} placeholder="Message"></textarea>
                <button>Send</button>
            </form>
            </div>
        </div>
    );
};

export default ContactPage;
