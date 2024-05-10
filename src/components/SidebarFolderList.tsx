"use client";

import { cn } from "@/src/lib/utils";
import { Folder } from "@prisma/client";
import { Folder as FolderIcon, FolderOpen } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SidebarFoldersList({
  folders,
}: {
  folders: Array<Folder>;
}) {
  const params = useParams<{ folderId: string }>();

  return (
    <ul className="space-y-1">
      {folders.map((folder) => {
        const isActive = folder.id === params.folderId;
        return (
          <li>
            <Link
              href={`/folder/${folder.id}`}
              className={cn(
                "block hover:bg-gray-500 hover:text-white transition-colors",
                isActive && "bg-gray-500 text-white"
              )}
            >
              <div className="flex items-center gap-4 px-5 h-10">
                {isActive ? <FolderOpen size={20} /> : <FolderIcon size={20} />}
                <p className="text-base">{folder.name}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
