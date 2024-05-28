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
import { useParams } from "next/navigation";

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

  const { noteId } = useParams<Record<"noteId", string>>();
  const isSelected = note.id === noteId;

  return (
    <li>
      <Link
        onClick={() => {
          if (tempNote?.temp) {
            handleDeleteNote(tempNote.id);
            handleUpdateTempNote(null);
          }
        }}
        className={`block space-y-2 border-b border-gray-300 p-4 ${isSelected ? "bg-gray-300" : ""}`}
        href={`/folder/${folderName}/${folderId}/note/${note.id}`}
      >
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-700">
          {note.title}
        </h3>
        <div className="flex items-center gap-2 text-sm ">
          <time className="text-base text-gray-600">
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
          <ContentEditable className="line-clamp-1 text-sm text-gray-500" />
        }
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <EditorRefPlugin editorRef={editorRef} />
    </LexicalComposer>
  );
}
