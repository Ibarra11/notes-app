import { SquarePen } from "lucide-react";

export default function NotesListHeader({
  folderName,
  onCreateNote,
  noteCount,
}: {
  folderName: string;
  onCreateNote: () => void;
  noteCount: number;
}) {
  return (
    <div className="w-full border-b border-gray-300 px-4 pt-7 pb-4 space-y-12">
      <h2 className="text-2xl font-semibold">{folderName}</h2>
      <div className="flex items-center">
        <p className="text-gray-500 text-base mr-auto">{noteCount} notes</p>
        <button onClick={onCreateNote}>
          <SquarePen className="size-5" />
        </button>
      </div>
    </div>
  );
}
