import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];

  const title = `Notes - Filter: ${category}`;
  const description = `Page with filter for category "${category}".`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `test-next-js-silk-two.vercel.app/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${category}`,
        },
      ],
      type: "website",
      siteName: "Note App",
    },
  };
}

export default async function Note({ params }: Props) {
  const { slug } = await params;

  const category = slug[0];

  const startData = await fetchNotes("", 1, category);

  return <NoteClient startData={startData} category={category} />;
}
