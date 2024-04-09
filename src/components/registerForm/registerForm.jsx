// Why we use registerForm:
// Because we want to use the useFormState Hook
// And it needs to be a client side component
"use client"

import { register } from "@/lib/action"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./registerForm.module.css"

const RegisterForm = () => {

    const [state, formAction] = useFormState(register, undefined);

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push('/login')
    }, [state?.success, router])

    return (
        <form className={styles.form} action={formAction}>
            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" name="passwordRepeat" placeholder="Repeat Password" />
            <button>Register</button>
            {state?.error}
            <Link href="/login">Have an account? <b>Login</b></Link>
        </form>
    )
}

export default RegisterForm;