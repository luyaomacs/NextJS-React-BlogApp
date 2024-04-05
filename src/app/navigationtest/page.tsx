"use client"
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const NavigationTestPage = () => {

    // CLIENT SIDE NAVIGATION
    const router = useRouter()
    const pathname = usePathname() //usePathname hook
    const searchParams = useSearchParams()

    const q = searchParams.get("q")
    const sort = searchParams.get("sort")

    console.log(q)

    console.log(sort)

    const handleClick = () => {
        console.log("clicked")
        router.refresh()
        // router.push("/") // it performs a client-side navigation to the provided router
    }

    return (
        <div>
            <Link href="/" prefetch={false}>Click here</Link>
            <button onClick={handleClick}>Write and Redirect</button>
        </div>
    );
}

export default NavigationTestPage;