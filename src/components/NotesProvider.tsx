"use client";
import { Note } from "@prisma/client";
import React from "react";

interface ContextState {
  notes: Note[];
  handleTitleNoteChange: (noteId: string, newTitle: string) => void;
  handleNotesChange: (nextNotes: Note[]) => void;
  handleContentNoteChange: (noteId: string, newContent: string) => void;
  handleUpdateNote: (noteId: string, newNote: Note) => void;
  handleDeleteNote: (noteId: string) => void;
  handleAddNote: (note: Note) => void;
  tempNote: null | {
    id: string;
    temp: boolean;
  };
  handleUpdateTempNote: (
    tempNote: null | {
      id: string;
      temp: boolean;
    }
  ) => void;
}

export const NotesContext = React.createContext<ContextState>(
  {} as ContextState
);

export default function NotesProvider(props: {
  children: React.ReactNode;
  notes: Note[];
}) {
  const [notes, setNotes] = React.useState<Note[]>(props.notes);
  const [tempNote, setTempNote] = React.useState<null | {
    id: string;
    temp: boolean;
  }>(null);

  function handleUpdateTempNote(
    tempNote: null | { id: string; temp: boolean }
  ) {
    setTempNote(tempNote);
  }

  function handleContentNoteChange(noteId: string, newContent: string) {
    const nextNotes = notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, content: newContent };
      }
      return note;
    });
    setNotes(nextNotes);
  }

  function handleAddNote(note: Note) {
    const nextNotes = [note, ...notes];
    setNotes(nextNotes);
  }

  function handleTitleNoteChange(noteId: string, newTitle: string) {
    const noteToUpdate = notes.find((note) => note.id === noteId)!;
    noteToUpdate.title = newTitle;
    const nextNotes = notes.filter((note) => note.id !== noteId);
    setNotes([noteToUpdate, ...nextNotes]);
  }

  function handleUpdateNote(noteId: string, newNote: Note) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === noteId) {
          return newNote;
        }
        return note;
      });
    });
  }

  function handleDeleteNote(noteId: string) {
    const nextNotes = notes.filter((note) => note.id !== noteId);
    setNotes(nextNotes);
  }

  function handleNotesChange(nextNotes: Note[]) {
    setNotes(nextNotes);
  }

  // React.useEffect(() => {
  //   setNotes(props.notes);
  // }, [props.note]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        handleTitleNoteChange,
        handleNotesChange,
        handleContentNoteChange,
        handleUpdateNote,
        handleDeleteNote,
        handleAddNote,
        tempNote,
        handleUpdateTempNote,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}
