import { FileText } from "lucide-react";

export default function SidebarRecentFolders() {
  return (
    <div className="space-y-4 text-gray-400 ">
      <div className="flex justify-between px-5">
        <h2 className="text-xs font-semibold">Recents</h2>
      </div>
      <div className="space-y-1">
        <div className="hover:bg-purple-500 hover:text-white">
          <div className="flex items-center gap-4 px-5 h-10">
            <FileText size={20} />
            <p className="text-base">Reflections on the past</p>
          </div>
        </div>
      </div>
    </div>
  );
}
