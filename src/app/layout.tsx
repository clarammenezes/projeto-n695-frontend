import type { Metadata } from "next";
import { Inter, Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import HeaderComponent from "@/components/header";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "BookStore",
  description: "Compartilhe livros com seus amigos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={roboto.className}>
        <HeaderComponent/>
        <main>{children}</main>
        <Toaster position="top-right" richColors/> 
      </body>
      </html>
  );
}
