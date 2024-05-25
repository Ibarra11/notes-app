"use client";
import { Note } from "@prisma/client";
import { Input } from "./ui/input";
import React from "react";
import { useDebounce } from "../hooks/useDebounce";
import { updateTitle } from "../actions/note.actions";
import { useParams, useRouter } from "next/navigation";
import { NotesContext } from "./NotesProvider";

export default function NoteHeader({ ...props }: { note: Note | null }) {
  const {
    handleTitleNoteChange,
    notes,
    handleUpdateNote,
    tempNote,
    handleUpdateTempNote,
  } = React.useContext(NotesContext);
  const note = props.note
    ? props.note
    : notes.find((note) => note.id === tempNote?.id);

  const [title, setTitle] = React.useState(note ? note.title : "");
  const router = useRouter();

  const debouncedUpdateTitle = useDebounce(async () => {
    if (!note) return;
    const updatedNote = await updateTitle({
      folderId: note.folderId,
      noteId: note.id,
      newTitle: title,
    });
    if (tempNote) {
      //   const nextNotes = notes.map((n) => {
      //     if (n.id === tempNote.id) {
      //       return updatedNote;
      //     }
      //     return n;
      //   });

      handleUpdateNote(tempNote.id, updatedNote);
      handleUpdateTempNote(null);
      //   if (window.location.pathname.includes(note.id)) {
      //     router.push(
      //       `/folder/${folderName}/${updatedNote.folderId}/note/${updatedNote.id}`
      //     );
      //   }
      return;
    }
    handleUpdateNote(updatedNote.id, updatedNote);
  });

  if (!note) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    handleTitleNoteChange(note.id, e.target.value);
    debouncedUpdateTitle();
    if (tempNote && tempNote.temp) {
      handleUpdateTempNote({ ...tempNote, temp: false });
    }
  };
  return (
    <Input
      value={title}
      onChange={handleChange}
      className="text-3xl font-bold bg-transparent border-t-0 border-r-0 border-l-0 shadow-none border-gray-400 rounded-none p-0 pb-1 max-w-lg w-full break-words overflow-hidden"
    />
  );
}
