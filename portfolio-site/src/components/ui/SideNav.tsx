import Link from "next/link";

export default function SideNav() {
    return (
        <nav className="flex items-center justify-between w-full p-10 text-xl font-semibold">
        <div>Dylan Cree</div>
        <div>about me</div>
        <div>Gallery</div>
        <div>Contact</div>
        <div>
            <Link href="/admin-panel" >Admin Panel</Link>
        </div>
        </nav>
    );
}
