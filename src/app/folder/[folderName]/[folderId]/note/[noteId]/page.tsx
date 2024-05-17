import NoteContainer from "@/src/components/NoteContainer";
import NoteHeader from "@/src/components/NoteHeader";
import NoteMetaData from "@/src/components/NoteMetadata";
import NotesListContainer from "@/src/components/NotesListContainer";
import TextEditor from "@/src/components/TextEditor";
import { Input } from "@/src/components/ui/input";
import { prisma } from "@/src/db";
import { Note } from "@prisma/client";
import { $createParagraphNode, $createTextNode } from "lexical";

async function loadContent(note: Note) {
  // Create a new ParagraphNode

  const paragraphNode = $createParagraphNode();

  // Create a new TextNode
  const textNode = $createTextNode(note.content);

  // Append the text node to the paragraph
  paragraphNode.append(textNode);
  return paragraphNode;
}

export default async function Note({
  params,
}: {
  params: { folderName: string; folderId: string; noteId: string };
}) {
  const { folderId, noteId, folderName } = params;
  let defaultNote: Note;

  const noteRequest = prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  const folderRequest = prisma.folder.findUnique({
    where: {
      id: folderId,
    },
  });
  const [note, folder] = await Promise.all([noteRequest, folderRequest]);

  // no corresponding folder 404 not found
  if (!folder) {
    // not found
    throw Error;
  }
  // There is a folder, but this note does not belong to this folder
  if (note && note.folderId !== folder.id) {
    // not found
    throw Error;
  }

  // there is a folder, but there is no entry for the note, then it is a temporary note
  if (!note) {
    defaultNote = {
      id: crypto.randomUUID(),
      title: "New note",
      content: "New note hello how are you",
      folderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return (
      <NoteContainer>
        <NoteHeader folderName={folderName} note={defaultNote} />
        <TextEditor note={defaultNote} />
      </NoteContainer>
    );
  }

  // note is valid and it belongs to this current folder
  return (
    <NoteContainer>
      <NoteHeader folderName={folderName} note={note} />
      <TextEditor note={note} />
    </NoteContainer>
  );
}
