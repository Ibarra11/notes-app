"use client";
import { Note } from "@prisma/client";
import Link from "next/link";
import dayjs from "dayjs";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import React from "react";
import { LexicalEditor } from "lexical";
import { NotesContext } from "./NotesProvider";

export default function Note({
  note,
  folderId,
  folderName,
}: {
  note: Note;
  folderName: string;
  folderId: string;
}) {
  const { tempNote, handleDeleteNote, handleUpdateTempNote } =
    React.useContext(NotesContext);
  return (
    <li>
      <Link
        onClick={() => {
          if (tempNote?.temp) {
            handleDeleteNote(tempNote.id);
            handleUpdateTempNote(null);
          }
        }}
        className="block p-5 space-y-2 rounded bg-gray-500"
        href={`/folder/${folderName}/${folderId}/note/${note.id}`}
      >
        <h3 className="text-lg font-semibold text-gray-50">{note.title}</h3>
        <div className="flex items-center gap-2 text-sm border border-red-500">
          <time className="text-gray-200 text-base">
            {dayjs(note.updatedAt).format("DD/MM/YYYY")}
          </time>
          <NoteContent content={note.content} />
        </div>
      </Link>
    </li>
  );
}

function NoteContent({ content }: { content: string }) {
  const initialConfig = {
    namespace: "Content",
    onError: (error: unknown) => {},
    editorState: null,
    editable: false,
  };
  const editorRef = React.useRef<LexicalEditor | null | undefined>();
  React.useEffect(() => {
    if (editorRef.current && content) {
      const editorState = editorRef.current.parseEditorState(content);
      editorRef.current.setEditorState(editorState);
    }
  }, [content]);
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={
          <ContentEditable className="text-gray-300 text-sm line-clamp-1" />
        }
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <EditorRefPlugin editorRef={editorRef} />
    </LexicalComposer>
  );
}
