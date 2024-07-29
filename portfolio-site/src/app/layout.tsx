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
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <div className="grid h-screen grid-rows-[auto,1fr]">
            <SideNav />
            <main className="overflow-y-scroll">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
