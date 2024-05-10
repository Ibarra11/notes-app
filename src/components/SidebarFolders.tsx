import { FolderPlus, Folder } from "lucide-react";
import SidebarFoldersList from "./SidebarFolderList";
import AddFolderModal from "./AddFolderModal";
import { prisma } from "../db";

function getFolders() {
  return ["Personal", "Work", "Travel", "Events", "Finance"];
}

export default async function SidebarFolders() {
  const folders = await prisma.folder.findMany();

  return (
    <div className="space-y-2 text-gray-400 ">
      <div className="flex justify-between items-center px-5">
        <h2 className="text-xs font-semibold">Folders</h2>
        <AddFolderModal />
      </div>
      <SidebarFoldersList folders={folders} />
    </div>
  );
}
