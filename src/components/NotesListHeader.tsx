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
    <div className="w-full space-y-12 border-b border-gray-300 p-4">
      {/* <h2 className="text-2xl font-semibold">{folderName}</h2> */}
      <div className="flex items-center">
        <p className="mr-auto text-base text-gray-500">{noteCount} notes</p>
        <button onClick={onCreateNote}>
          <SquarePen className="size-5" />
        </button>
      </div>
    </div>
  );
}
