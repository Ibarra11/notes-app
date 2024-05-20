"use client";
import { Note } from "@prisma/client";
import { Input } from "./ui/input";
import React from "react";
import { useDebounce } from "../hooks/useDebounce";
import { updateTitle } from "../actions/note.actions";
import { useRouter } from "next/navigation";
import { NotesContext } from "./NotesProvider";

export default function NoteHeader({
  note,
  folderName,
}: {
  note: Note;
  folderName: string;
}) {
  const { handleTitleNoteChange } = React.useContext(NotesContext);
  const [title, setTitle] = React.useState(note.title);
  const router = useRouter();
  const debouncedUpdateTitle = useDebounce(async () => {
    const updatedNote = await updateTitle({
      folderId: note.folderId,
      noteId: note.id,
      newTitle: title,
    });

    router.push(
      `/folder/${folderName}/${note.folderId}/note/${updatedNote.id}`
    );
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    handleTitleNoteChange(note.id, e.target.value);
    debouncedUpdateTitle();
  }

  return (
    <Input
      value={title}
      onChange={handleChange}
      className="text-3xl font-bold bg-transparent border-t-0 border-r-0 border-l-0  shadow-none"
    />
  );
}
