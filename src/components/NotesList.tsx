"use client";
import { Note } from "@prisma/client";
import React from "react";
import NotesListHeader from "./NotesListHeader";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NotesList({ notes }: { notes: Note[] }) {
  const [noteList, setNoteList] = React.useState(notes);
  const { folderId, folderName } =
    useParams<Record<"folderId" | "folderName", string>>();

  function handleCreateNote() {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "New note",
      content: "New note hello how are you",
      folderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNoteList([newNote, ...noteList]);
  }

  return (
    <div className="space-y-8 border border-green-500 w-96">
      <NotesListHeader
        onCreateNote={handleCreateNote}
        folderName={folderName}
      />
      <ul className="space-y-5 w-full h-full background-red-500">
        {noteList.map((note) => (
          <li className="p-5 space-y-2 rounded bg-gray-500">
            <Link href={`/folder/${folderName}/${folderId}/${note.id}`}>
              <h3 className=" text-lg font-semibold text-gray-50">
                {note.title}
              </h3>
              <div className="flex gap-2  text-sm">
                <time className="text-gray-400">
                  {note.updatedAt.getHours()}:{note.updatedAt.getMinutes()}
                </time>
                <p className="text-gray-300">{note.content}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
