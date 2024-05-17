"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db";

export async function updateTitle({
  folderId,
  noteId,
  newTitle,
}: {
  folderId: string;
  noteId: string;
  newTitle: string;
}) {
  const note = await prisma.note.upsert({
    where: {
      id: noteId,
    },
    update: {
      title: newTitle,
    },
    create: {
      title: newTitle,
      content: "",
      Folder: {
        connect: {
          id: folderId,
        },
      },
    },
  });
  revalidatePath(`/folder/[folderName]`, "layout");
  return note;
}
