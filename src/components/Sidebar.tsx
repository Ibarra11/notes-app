"use client";
import SidebarFolders from "./SidebarFolders";
import SidebarMoreActions from "./SidebarMoreActions";
import SidebarRecentFolders from "./SidebarRecentFolders";
import withResize from "./withResize";

function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <aside className="h-screen w-full  bg-black py-6">
      <div className="mb-8 flex justify-between px-5 text-gray-400">
        <h1>Notes</h1>
        <span>Search</span>
      </div>
      <div className="space-y-8">
        {/* <SidebarRecentFolders /> */}
        {/* <SidebarFolders /> */}
        {children}
        {/* <SidebarMoreActions /> */}
      </div>
    </aside>
  );
}

export default withResize({
  WrappedComponent: Sidebar,
  minWidth: 140,
  maxWidth: 300,
});
