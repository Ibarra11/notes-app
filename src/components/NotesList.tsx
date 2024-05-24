"use client";
import Prisma from "@prisma/client";
import React from "react";
import NotesListHeader from "./NotesListHeader";
import { useParams, useRouter } from "next/navigation";
import { NotesContext } from "./NotesProvider";
import Note from "./Note";

export default function NotesList() {
  const { notes, handleNotesChange, handleUpdateTempNote } =
    React.useContext(NotesContext);
  const router = useRouter();
  const { folderId, folderName, noteId } =
    useParams<Record<"folderId" | "folderName" | "noteId", string>>();

  // React.useEffect(() => {
  //   if (tempNote && tempNote.id !== noteId) {
  //     const nextNotes = notes.filter((note) => note.id !== tempNote.id);
  //     handleNotesChange(nextNotes);
  //   }
  // }, [noteId]);

  function handleCreateNote() {
    const newNote: Prisma.Note = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: "",
      folderId,
      createdAt: new Date(),
      updatedAt: new Date(),
      preview: "",
    };
    handleNotesChange([newNote, ...notes]);
    handleUpdateTempNote({ id: newNote.id, temp: true });
    router.push(`/folder/${folderName}/${folderId}/note/${newNote.id}`);
  }

  return (
    <div className="space-y-8 py-7 border border-green-500 w-96">
      <NotesListHeader
        onCreateNote={handleCreateNote}
        folderName={folderName}
      />
      <ul className="space-y-5">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            folderId={folderId}
            folderName={folderName}
          />
        ))}
      </ul>
    </div>
  );
}
