"use client";
import { createHeadlessEditor } from "@lexical/headless";
import { Note } from "@prisma/client";
import { $getRoot } from "lexical";
import Link from "next/link";

export default function Note({
  note,
  folderId,
  folderName,
}: {
  note: Note;
  folderName: string;
  folderId: string;
}) {
  return (
    <li>
      <Link
        className="block p-5 space-y-2 rounded bg-gray-500"
        href={`/folder/${folderName}/${folderId}/note/${note.id}`}
      >
        <h3 className=" text-lg font-semibold text-gray-50">{note.title}</h3>
        <div className="flex items-center gap-2 text-sm border border-red-500">
          <time className="text-gray-200 text-base">
            {note.updatedAt.getHours()}:{note.updatedAt.getMinutes()}
          </time>
          <NoteContent content={note.content} />
        </div>
      </Link>
    </li>
  );
}

function NoteContent({ content }: { content: string }) {
  const editor = createHeadlessEditor({
    nodes: [],
    onError: () => {},
  });
  const parsedEditorState = editor.parseEditorState(content);
  const editorStateTextString = parsedEditorState.read(() =>
    $getRoot().getTextContent()
  );
  return (
    <p className="text-gray-300 text-sm line-clamp-1">
      {editorStateTextString}
    </p>
  );
}
