import { Inter } from "next/font/google";
import "@styles/globals.css";
import NextAuthProvider from "./Provider";
import Head from "next/head";
import NavPC from "@components/navPC";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Iglesia",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <>
    {/* Developed by alexoh */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <html lang="en">
        <body className={inter.className}>
          {/* <NavPC/> */}
          <NextAuthProvider>{children}</NextAuthProvider>
        </body>
      </html>
    </>
  );
}
