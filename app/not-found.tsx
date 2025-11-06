import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "This page does not exist in NoteSpace.",
  openGraph: {
    title: "404 - Page Not Found",
    description: "This page does not exist in NoteSpace.",
    url: "test-next-js-silk-two.vercel.app/not-found",
    images: [
      {
        url: "https://res.cloudinary.com/dvojqixys/image/upload/v1762469426/imageNoteSpace_w8ycvc.png",
        width: 1200,
        height: 630,
        alt: "NoteSpace 404 Preview",
      },
    ],
    type: "website",
    siteName: "NoteSpace",
  },
  alternates: {
    canonical: "test-next-js-silk-two.vercel.app/not-found",
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
