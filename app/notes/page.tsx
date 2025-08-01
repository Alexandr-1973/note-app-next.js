import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";

const Note = async () => {
  const startData = await fetchNotes();

  return <NoteClient startData={startData} />;
};

export default Note;
