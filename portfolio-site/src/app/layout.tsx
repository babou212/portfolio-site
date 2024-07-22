import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dylan Cree",
  description: "Dylan Cree Photography Portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function SideNav() {
  return (
    <nav className="flex items-center justify-between w-full p-10 text-xl font-semibold">
      <div>Dylan Cree</div>
      <div>about me</div>
      <div>Gallery</div>
      <div>Contact</div>
      <div>Admin Panel</div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex flex-col">
        <SideNav />
        {children}
      </body>
    </html>
  );
}