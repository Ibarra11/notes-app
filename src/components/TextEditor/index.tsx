"use client";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  EditorState,
  ParagraphNode,
} from "lexical";
import React, { useEffect } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/Toolbar";
import { Note } from "@prisma/client";
import { useDebounce } from "@/src/hooks/useDebounce";
import { updateNoteContent } from "@/src/actions/note.actions";
import { NotesContext } from "../NotesProvider";
import NoteHeader from "../NoteHeader";

// const theme = {
//   // Theme styling goes here
//   ...
// }

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: unknown) {
  console.error(error);
}

export default function TextEditor(props: { note: Note | null }) {
  const [editorState, setEditorState] = React.useState("");
  const {
    handleContentNoteChange,
    handleUpdateNote,
    notes,
    tempNote,
    handleUpdateTempNote,
  } = React.useContext(NotesContext);
  const note = props.note
    ? props.note
    : notes.find((note) => note.id === tempNote?.id);

  const initialConfig = {
    namespace: "MyEditor",
    onError,
    editorState: note?.content || null,
  };

  const debouncedUpdateContent = useDebounce(async () => {
    if (!note) return;
    const newNote = await updateNoteContent({
      noteId: note.id,
      content: editorState,
    });
    handleUpdateNote(note.id, newNote);
  });

  if (!note) return null;

  const onChange = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
    handleContentNoteChange(note.id, JSON.stringify(editorStateJSON));
    debouncedUpdateContent();
    if (tempNote && tempNote.temp) {
      handleUpdateTempNote({ ...tempNote, temp: false });
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex h-screen flex-col space-y-8 px-12 pt-4">
        <ToolbarPlugin />
        <div className="flex flex-1 flex-col space-y-12">
          <NoteHeader note={note} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="flex-1 text-base outline-0" />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange} ignoreSelectionChange />
      </div>
    </LexicalComposer>
  );
}
