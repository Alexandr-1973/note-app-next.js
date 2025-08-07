import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import Modal from "@/components/Modal/Modal";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const data = await fetchNoteById(id);

  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
