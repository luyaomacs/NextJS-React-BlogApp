// Why we use registerForm:
// Because we want to use the useFormState Hook
// And it needs to be a client side component
"use client"

import { login } from "@/lib/action"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./loginForm.module.css"

const LoginForm = () => {

    const [state, formAction] = useFormState(login, undefined);

    const router = useRouter();

    // useEffect(() => {
    //     state?.success && router.push('/login')
    // }, [state?.success, router])

    return (
        <form className={styles.form} action={formAction}>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button>Login</button>
            {state?.error}
            <Link href="/register">{"Don't have an account?"}<b>Register</b></Link>
        </form>
    )
}

export default LoginForm;