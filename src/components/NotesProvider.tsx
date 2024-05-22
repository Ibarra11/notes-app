"use client";
import { Note } from "@prisma/client";
import React from "react";

interface ContextState {
  notes: Note[];
  handleTitleNoteChange: (noteId: string, newTitle: string) => void;
  handleNotesChange: (nextNotes: Note[]) => void;
  handleUpdateNoteChange: (noteId: string, newContent: string) => void;
}

export const NotesContext = React.createContext<ContextState>(
  {} as ContextState
);

export default function NotesProvider(props: {
  children: React.ReactNode;
  notes: Note[];
}) {
  const [notes, setNotes] = React.useState<Note[]>(props.notes);

  function handleUpdateNoteChange(noteId: string, newContent: string) {
    const nextNotes = notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, content: newContent };
      }
      return note;
    });
    setNotes(nextNotes);
  }

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

  React.useEffect(() => {
    setNotes(props.notes);
  }, [props.notes]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        handleTitleNoteChange,
        handleNotesChange,
        handleUpdateNoteChange,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}
