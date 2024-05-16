import NotesListContainer from "@/src/components/NotesListContainer";

export default function FolderLayout({
  params,
  children,
}: React.PropsWithChildren<{
  params: { folderName: string; folderId: string };
}>) {
  const { folderId } = params;
  return (
    <div className="flex gap-8 h-screen w-full border border-red-500">
      <NotesListContainer folderId={folderId} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
