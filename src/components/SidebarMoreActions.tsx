"use client";
import { Star, Trash, Archive } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

const MORE_ACTIONS: Array<{
  label: string;
  href: string;
  icon: React.ReactElement;
}> = [
  {
    label: "Favorites",
    href: "/favorties",
    icon: <Star size={20} />,
  },
  {
    label: "Trash",
    href: "/trash",
    icon: <Trash size={20} />,
  },
  {
    label: "Archived",
    href: "/archived",
    icon: <Archive size={20} />,
  },
];

export default function SidebarMoreActions() {
  const { moreSlug } = useParams();

  return (
    <div className="space-y-4 text-gray-400 ">
      <div className="flex justify-between px-5">
        <h2 className="text-xs font-semibold">More</h2>
      </div>
      <ul className="space-y-1">
        {MORE_ACTIONS.map((action) => {
          const isActive = action.href.includes(moreSlug as string);
          return (
            <li className="hover:bg-gray-500 hover:text-white transition-colors">
              <Link
                href={action.href}
                className={cn(
                  "block hover:bg-gray-500 hover:text-white transition-colors",
                  isActive && "bg-gray-500 text-white"
                )}
              >
                <div className="flex items-center gap-4 h-10 px-5">
                  {action.icon}
                  {action.label}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
