import "~/styles/globals.css";
import SideNav from "../components/ui/SideNav"
import { ThemeProvider } from "../components/themeProvider"

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dylan Cree",
  description: "Dylan Cree Photography Portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex flex-col">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <SideNav />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
