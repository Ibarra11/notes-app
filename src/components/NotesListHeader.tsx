import { SquarePen } from "lucide-react";

export default function NotesListHeader({
  folderName,
  onCreateNote,
}: {
  folderName: string;
  onCreateNote: () => void;
}) {
  return (
    <div className="flex items-center justify-between w-full border border-red-500">
      <h2 className="text-xl font-semibold">{folderName}</h2>
      <button onClick={onCreateNote}>
        <SquarePen className="size-5" />
      </button>
    </div>
  );
}
