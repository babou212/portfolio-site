import Link from "next/link";
import { verifySession } from "../../server/session";

const isValidSession = verifySession();

export default async function SideNav() {
    return (
        <nav className="flex items-center justify-between w-full p-10 text-xl font-semibold">
        <Link href="/" >Dylan Cree</Link>
        <Link href="/about-me" >About</Link>
        <Link href="/gallery" >Gallery</Link>
        <Link href="/contact" >Contact</Link>
        {await isValidSession && <Link href="/admin-panel" >Admin Panel</Link>}
        </nav>
    );
}
