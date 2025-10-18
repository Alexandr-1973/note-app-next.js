"use client";

import css from "./NotePreview.module.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById, NoteByIdResponse } from "@/lib/api/clientApi";
import { useEffect } from "react";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NotePreviewClient() {
  const pathname = usePathname();
  const { setDraft, clearDraft } = useNoteDraftStore();

  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
    isSuccess,
  } = useQuery<NoteByIdResponse>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isSuccess && note) {
      setDraft(note);
    }
  }, [isSuccess, note, setDraft]);

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const showModal = pathname === `/notes/${id}`;

  const close = () => {
    clearDraft();
    router.back();
  };

  const handleClick = () => {
    router.replace(`/notes/${id}/edit`);
  };

  return (
    <>
      {showModal && (
        <Modal close={close}>
          <div className={css.container}>
            <button className={css.editButton} onClick={() => handleClick()}>
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
