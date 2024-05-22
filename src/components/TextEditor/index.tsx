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

export default function TextEditor({ note }: { note: Note }) {
  const [editorState, setEditorState] = React.useState("");
  const { handleUpdateNoteChange } = React.useContext(NotesContext);
  const initialConfig = {
    namespace: "MyEditor",
    onError,
    editorState: note.content || null,
  };

  const debouncedUpdateContent = useDebounce(async () => {
    await updateNoteContent({
      noteId: note.id,
      content: editorState,
    });
  });

  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
    handleUpdateNoteChange(note.id, JSON.stringify(editorStateJSON));

    debouncedUpdateContent();
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex flex-col flex-1 w-full  h-screen">
        <ToolbarPlugin />
        <div className="flex-1 h-full bg-gray-300">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="py-2 h-full px-4 text-base" />
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
