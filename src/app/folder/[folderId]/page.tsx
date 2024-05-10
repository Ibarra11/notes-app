function getNotesForFolder() {}

export default function Folder({ params }: { params: { folderId: string } }) {
  const notes = getNotesForFolder();
  return <p>{params.folderId}</p>;
}
