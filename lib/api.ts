import axios from "axios";
import type { Note, NoteResponse, NoteTag } from "@/types/note";

export interface GetResponse {
  notes: NoteResponse[];
  totalPages: number;
}

interface deleteResponse {
  message: string;
}

export type NoteByIdResponse = {
  content: string;
  createdAt: string;
  id: string;
  tag: NoteTag;
  title: string;
  updatedAt: string;
};

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export async function fetchNotes(query: string = "", page: number = 1) {
  const response = await axios.get<GetResponse>("?perPage=12", {
    params: {
      page,
      search: query,
    },
    ...auth,
  });

  return response.data;
}

export async function createNote(note: Note) {
  const response = await axios.post<NoteResponse>("", note, auth);
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await axios.delete<deleteResponse>(`${id}`, auth);
  return response;
}

export async function fetchNoteById(id: string) {
  const response = await axios.get<NoteByIdResponse>(`${id}`, auth);
  return response.data;
}
