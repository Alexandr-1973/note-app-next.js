import type { NoteResponse } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export interface GetResponse {
  notes: NoteResponse[];
  totalPages: number;
}

interface deleteResponse {
  message: string;
}

export type NoteByIdResponse = {
  content: string;
  created_at: string;
  id: string;
  tag: string;
  title: string;
  updated_at: string;
};

interface Params {
  search: string;
  page: number;
  tag?: string;
  perPage: number;
}

async function getAuth(): Promise<{ headers: { Cookie: string } }> {
  const cookieStore = await cookies();
  const auth = {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
  return auth;
}

export async function fetchNotes(
  query: string = "",
  page: number = 1,
  tag: string
) {
  const params: Params = {
    page,
    search: query,
    perPage: 12,
  };

  if (tag !== "All") {
    params.tag = tag;
  }

  const response = await nextServer.get<GetResponse>("notes", {
    params,
    ...(await getAuth()),
  });
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await nextServer.delete<deleteResponse>(
    `notes/${id}`,
    await getAuth()
  );
  return response;
}

export async function fetchNoteById(id: string) {
  const response = await nextServer.get<NoteByIdResponse>(
    `notes/${id}`,
    await getAuth()
  );

  return response.data;
}

export const getServerMe = async (): Promise<User> => {
  const { data } = await nextServer.get("/users/me", await getAuth());
  return data;
};

export const checkServerSession = async () => {
  const res = await nextServer.get("/auth/session", await getAuth());
  return res;
};
