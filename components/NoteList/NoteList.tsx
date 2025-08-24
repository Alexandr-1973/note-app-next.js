import css from "./NoteList.module.css";
import type { NoteResponse } from "../../types/note";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";

interface NotesProps {
  notes: NoteResponse[];
}

export default function NoteList({ notes }: NotesProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <>
      {notes.length === 0 && <span>Not found</span>}
      {notes.length > 0 && (
        <ul className={css.list}>
          {notes.map((note) => (
            <li className={css.listItem} key={note.id}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <Link
                  href={`/notes/${note.id}`}
                  className={css.link}
                  scroll={false}
                >
                  View details
                </Link>
                <button
                  className={css.button}
                  onClick={() => deleteNoteMutation.mutate(note.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
