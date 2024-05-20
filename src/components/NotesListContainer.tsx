import React from "react";
import { prisma } from "../db";
import NotesList from "./NotesList";

export default async function NotesListContainer({
  folderId,
}: {
  folderId: string;
}) {
  return <NotesList />;
}
