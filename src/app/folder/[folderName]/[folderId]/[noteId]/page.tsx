import TextEditor from "@/src/components/TextEditor";
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
  params: { folderId: string; noteId: string };
}) {
  const { folderId, noteId } = params;
  const note: Note = {
    id: crypto.randomUUID(),
    title: "New note",
    content: "New note hello how are you",
    folderId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  //   const note = await prisma.note.findUnique({
  //     where: {
  //       id: noteId,
  //     },
  //   });
  if (!note) {
    //  not found
    throw Error;
  }

  if (note.folderId !== folderId) {
    throw Error;
  }

  return <TextEditor note={note} />;
}
