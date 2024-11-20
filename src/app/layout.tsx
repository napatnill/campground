import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/layout/theme-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "JoJo Campground",
  description: "Created by JoJo Team"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  // nextAuthSession
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider session={nextAuthSession}>
          <ThemeProvider
            attribute="class" 
            defaultTheme="system" 
            enableSystem 
            disableTransitionOnChange        
          >
            {children}
          </ThemeProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
