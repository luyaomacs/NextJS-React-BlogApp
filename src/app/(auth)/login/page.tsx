// import { login } from "@/lib/action";
import { handleGithubLogin } from "@/lib/action";
import LoginForm from "@/components/loginForm/loginForm";
import styles from "./login.module.css";
import { Router } from "next/router";

const LoginPage = () => {

    // auth?.user?isAdmin && router.push("/");

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
            <form action={handleGithubLogin}>
                <button className={styles.github}>Login with Github</button>
            </form>
            <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
