// "use client"

import NoteEditForm from "@/components/NoteEditForm/NoteEditForm";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Note | Notes App",
  description:
    "Edit a note with title, content and tag. Organize your tasks and thoughts easily.",
  alternates: {
    canonical: "test-next-js-silk-two.vercel.app/create",
  },
  openGraph: {
    title: "Edit Note | Notes App",
    description:
      "Edit a note with title, content and tag. Organize your tasks and thoughts easily.",
    url: "test-next-js-silk-two.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Edit Note Page",
      },
    ],
    type: "website",
  },
};

export default async function EditNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Edit note</h1>
        <NoteEditForm />
      </div>
    </main>
  );
}
