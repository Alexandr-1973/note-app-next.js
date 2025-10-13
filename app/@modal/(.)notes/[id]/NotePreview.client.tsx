"use client";

import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useState } from "react";

export default function NotePreviewClient() {

  const [isOpen, setIsOpen]=useState(true)
  const router = useRouter();

  const { id } = useParams<{ id: string }>();



  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const close = () => router.back();

  const handleClick = () => {
    setIsOpen(false);
    router.replace(`/notes/${id}/edit`);
  };

   return (
    <>
      {isOpen && (
        <Modal close={close}>
          <div className={css.container}>
            <button className={css.editButton} onClick={()=>handleClick()}>
              Edit
            </button>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.created_at}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
