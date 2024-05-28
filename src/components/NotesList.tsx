"use client";
import Prisma from "@prisma/client";
import React from "react";
import NotesListHeader from "./NotesListHeader";
import { useParams, useRouter } from "next/navigation";
import { NotesContext } from "./NotesProvider";
import withResize from "./withResize";
import Note from "./Note";

function NotesList() {
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
    <div className=" max-w- border-r border-gray-300 bg-gray-200 shadow ">
      <NotesListHeader
        noteCount={notes.length}
        onCreateNote={handleCreateNote}
        folderName={folderName}
      />
      <ul>
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

export default withResize({
  WrappedComponent: NotesList,
  minWidth: 200,
  maxWidth: 500,
});
