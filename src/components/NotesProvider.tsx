"use client";
import { Note } from "@prisma/client";
import React from "react";

interface ContextState {
  notes: Note[];
  handleTitleNoteChange: (noteId: string, newTitle: string) => void;
  handleNotesChange: (nextNotes: Note[]) => void;
}

export const NotesContext = React.createContext<ContextState>(
  {} as ContextState
);

export default function NotesProvider(props: {
  children: React.ReactNode;
  notes: Note[];
}) {
  const [notes, setNotes] = React.useState<Note[]>(props.notes);

  function handleTitleNoteChange(noteId: string, newTitle: string) {
    const nextNotes = notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, title: newTitle };
      }
      return note;
    });
    setNotes(nextNotes);
  }

  function handleNotesChange(nextNotes: Note[]) {
    setNotes(nextNotes);
  }

  return (
    <NotesContext.Provider
      value={{ notes, handleTitleNoteChange, handleNotesChange }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}
