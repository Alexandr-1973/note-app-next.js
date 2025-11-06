import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteSpace",
  description: "Notes application",
  openGraph: {
    title: "NoteSpace",
    description: "Notes application",
    url: "test-next-js-silk-two.vercel.app/",
    images: [
      {
        url: "https://res.cloudinary.com/dvojqixys/image/upload/v1762469426/imageNoteSpace_w8ycvc.png",
        width: 1200,
        height: 630,
        alt: "NoteSpace",
      },
    ],
    type: "website",
    siteName: "NoteSpace",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
