"use client";
import Prisma from "@prisma/client";
import React from "react";
import NotesListHeader from "./NotesListHeader";
import { useParams } from "next/navigation";
import Link from "next/link";
import { NotesContext } from "./NotesProvider";
import Note from "./Note";

export default function NotesList() {
  const { notes } = React.useContext(NotesContext);
  const [tempNote, setTempNote] = React.useState<Prisma.Note | null>(null);
  const { folderId, folderName, noteId } =
    useParams<Record<"folderId" | "folderName" | "noteId", string>>();

  React.useEffect(() => {
    if (tempNote && tempNote.id !== noteId) {
      setTempNote(null);
    }
  }, [noteId]);

  function handleCreateNote() {
    const newNote: Prisma.Note = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      folderId,
      createdAt: new Date(),
      updatedAt: new Date(),
      preview: "",
    };
    setTempNote(newNote);
  }

  return (
    <div className="space-y-8 py-7 border border-green-500 w-96">
      <NotesListHeader
        onCreateNote={handleCreateNote}
        folderName={folderName}
      />
      <ul className="space-y-5">
        {tempNote && (
          <li key={tempNote.id} className="p-5 space-y-2 rounded bg-gray-500">
            <Link
              href={`/folder/${folderName}/${folderId}/note/${tempNote.id}`}
            >
              <h3 className=" text-lg font-semibold text-gray-50">
                {tempNote.title}
              </h3>
              <div className="flex gap-2  text-sm">
                <time className="text-gray-400">
                  {tempNote.updatedAt.getHours()}:
                  {tempNote.updatedAt.getMinutes()}
                </time>
                <p className="text-gray-300">{tempNote.content}</p>
              </div>
            </Link>
          </li>
        )}
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
