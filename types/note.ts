export interface NoteTag {
  tag: string;
}

export interface Note extends NoteTag {
  title: string;
  content: string;
}

export interface NoteResponse extends Note {
  id: string;
}
