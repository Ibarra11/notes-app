import { Note } from "@prisma/client";
import { Calendar } from "lucide-react";

export default function NoteMetaData({ note }: { note: Note }) {
  return (
    <div>
      <div className="">
        <h2 className=" text-3xl font-bold">{note.title}</h2>
      </div>
      <div>
        <div>
          <div className="flex gap-3 text-gray-300">
            <Calendar className="size-4" />
            <p className="text-sm">Date</p>
          </div>
        </div>
      </div>
    </div>
  );
}
