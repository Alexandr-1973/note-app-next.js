import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Note | NoteSpace",
  description:
    "Create a new note with title, content and tag. Organize your tasks and thoughts easily.",
  alternates: {
    canonical: "test-next-js-silk-two.vercel.app/create",
  },
  openGraph: {
    title: "Create New Note | NoteSpace",
    description:
      "Create a new note with title, content and tag. Organize your tasks and thoughts easily.",
    url: "test-next-js-silk-two.vercel.app/notes/action/create",
    images: [
      {
        url: "https://res.cloudinary.com/dvojqixys/image/upload/v1762469426/imageNoteSpace_w8ycvc.png",
        width: 1200,
        height: 630,
        alt: "Create NoteSpace Page",
      },
    ],
    type: "website",
  },
};

export default async function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
