import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Note({ params }: Props) {
  const { slug } = await params;

  const category = slug[0];

  const startData = await fetchNotes("", 1, category);

  return <NoteClient startData={startData} category={category} />;
}
