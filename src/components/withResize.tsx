"use client";

import React from "react";

export default function withResize<P extends { children?: React.ReactNode }>({
  WrappedComponent,
  minWidth,
  maxWidth,
}: {
  WrappedComponent: React.FC<P>;
  minWidth: number;
  maxWidth: number;
}) {
  return (props: P) => {
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = React.useState(false);
    const [sidebarWidth, setSidebarWidth] = React.useState<number | null>(null);
    const startResizing = React.useCallback(() => {
      setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
      setIsResizing(false);
    }, []);

    const resize = React.useCallback(
      (mouseMoveEvent: MouseEvent) => {
        if (isResizing && sidebarRef.current) {
          setSidebarWidth(
            mouseMoveEvent.clientX -
              sidebarRef.current.getBoundingClientRect().left,
          );
        }
      },
      [isResizing],
    );

    React.useEffect(() => {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
      return () => {
        window.removeEventListener("mousemove", resize);
        window.removeEventListener("mouseup", stopResizing);
      };
    }, [resize, stopResizing]);

    return (
      <div
        ref={sidebarRef}
        style={{ width: sidebarWidth ?? "100%", minWidth, maxWidth }}
        className="flex"
      >
        <WrappedComponent {...props} />
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            startResizing();
          }}
          className="w-1 flex-none cursor-col-resize resize-x hover:bg-gray-500"
        ></div>
      </div>
    );
  };
}
