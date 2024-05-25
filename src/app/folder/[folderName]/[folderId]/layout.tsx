import NotesList from "@/src/components/NotesList";

import NotesProvider from "@/src/components/NotesProvider";
import { prisma } from "@/src/db";

export default async function FolderLayout({
  params,
  children,
}: React.PropsWithChildren<{
  params: { folderName: string; folderId: string };
}>) {
  const { folderId } = params;
  const notes = await prisma.note.findMany({
    where: {
      folderId: folderId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="flex h-screen w-full ">
      <NotesProvider notes={notes}>
        <NotesList />
        <div className="flex-1">{children}</div>
      </NotesProvider>
    </div>
  );
}
