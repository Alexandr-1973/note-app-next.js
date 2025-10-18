import type { Note, NoteResponse } from "@/types/note";
import { nextServer } from "./api";
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

  const response = await nextServer.get<GetResponse>("notes", { params });
  return response.data;
}

export async function createNote(note: Note) {
  const response = await nextServer.post<NoteResponse>("notes", note);
  return response.data;
}

export async function patchNote(id: string, note: Note) {
  const response = await nextServer.patch<NoteResponse>(`notes/${id}`, note);
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await nextServer.delete<deleteResponse>(`notes/${id}`);
  return response;
}

export async function fetchNoteById(id: string) {
  const response = await nextServer.get<NoteByIdResponse>(`notes/${id}`);

  console.log(response.data);

  return response.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

// export type PatchRequest = {
//   email: string;
//   userName?: string;
//   avatar_file?: File;
// };

export type UserPatch = {
  email: string;
  username: string;
  avatar: string;
};

// export const patchUser = async (data: PatchRequest) => {
//   const res = await nextServer.patch<UserPatch>("/users/me", data);
//   return res.data;
// };

export const patchUser = async (formData: FormData) => {
  const res = await nextServer.patch<UserPatch>("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
