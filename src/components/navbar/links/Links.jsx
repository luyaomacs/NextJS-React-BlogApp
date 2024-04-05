"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";

const links = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "Contact",
        path: "/contact"
    },
    {
        title: "Blog",
        path: "/blog"
    }
];

const Links = () => {

    // console.log("Links, it works here!")

    const [open, setOpen] = useState(false); // useState returns an array: the state and the function to update the state

    // TEMPORARY
    const session = true;
    const isAdmin = true;

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map(link=>(
                    <NavLink item={link} key={link.title}/>
                    ))}{
                        session ? (
                            <>
                    {isAdmin && <NavLink item={{title: "Admin", path: "/admin"}}/>}
                    <button className={styles.logout}>Logout</button>
                    </>
                ) : (
                    <NavLink item={{title: "Login", path: "/login"}}/>
                    )
                }
            </div>
            {/* <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button> */}
            <Image className={styles.menuButton} src="/menu.png" alt="menu" width={30} height={30} onClick={() => setOpen((prev) => !prev)}/>
            {open && (<div className={styles.mobileLinks}>
                {links.map((link)=>(
                <NavLink item={link} key={link.title}/>
                ))}
            </div>)
            }
        </div>
    );
};

export default Links;