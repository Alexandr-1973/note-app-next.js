"use client";

import css from "./NoteEditForm.module.css";
import type { Note, NoteResponse } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { GetResponse, patchNote } from "@/lib/api/clientApi";
import { useEffect } from "react";

export default function NoteEditForm() {
  const { id } = useParams<{ id: string }>();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      clearDraft();
    };
  }, [clearDraft]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const patchNoteMutation = useMutation({
    mutationFn: (note: Note) => patchNote(id, note),
    onSuccess: (updated: NoteResponse) => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.setQueryData(["notes", "", 1, "All"], (old: GetResponse) => {
        if (!old) return old;
        const existing = old.notes ?? [];
        const updatedNotes = existing.some(
          (n) => String(n.id) === String(updated.id)
        )
          ? existing.map((n) =>
              String(n.id) === String(updated.id) ? updated : n
            )
          : [updated, ...existing];

        return {
          ...old,
          notes: updatedNotes,
        };
      });
      router.push(`/notes/filter/All`);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as Note;
    patchNoteMutation.mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.replace(`/notes/filter/All`)}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Save
        </button>
      </div>
    </form>
  );
}
