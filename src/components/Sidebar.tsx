import SidebarFolders from "./SidebarFolders";
import SidebarMoreActions from "./SidebarMoreActions";
import SidebarRecentFolders from "./SidebarRecentFolders";

export default function Sidebar() {
  return (
    <aside className="h-screen w-80 py-6 bg-black">
      <div className="flex justify-between text-gray-400 px-5 mb-8">
        <h1>Notes</h1>
        <span>Search</span>
      </div>
      <div className="space-y-8">
        <SidebarRecentFolders />
        <SidebarFolders />
        <SidebarMoreActions />
      </div>
    </aside>
  );
}
