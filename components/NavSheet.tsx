"use client";

import { useRef, useEffect, ReactNode } from "react";

interface NavSheetProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  children: ReactNode;
}

const NavSheet = ({ isOpen, onClose, triggerRef, children }: NavSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Handle sheet opening/closing
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on body
      document.body.style.overflow = "hidden";
      document.body.classList.add("nav-sheet-open");

      // Add event listener to close sheet when clicking outside
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sheetRef.current &&
          !sheetRef.current.contains(event.target as Node) &&
          triggerRef.current !== event.target &&
          !triggerRef.current?.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Re-enable scrolling when unmounted or when sheet is closed
        document.body.style.overflow = "";
        document.body.classList.remove("nav-sheet-open");
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      // Re-enable scrolling when sheet is closed
      document.body.style.overflow = "";
      document.body.classList.remove("nav-sheet-open");
    }
  }, [isOpen, onClose, triggerRef]);

  return (
    <>
      {/* Invisible overlay with cursor:pointer when sheet is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent cursor-pointer z-30"
          onClick={onClose}
        ></div>
      )}

      {/* Sheet content */}
      <div
        ref={sheetRef}
        className={`fixed top-0 right-0 h-screen bg-white shadow-lg transition-all duration-400 z-40 ${
          isOpen ? "w-3/5" : "w-0"
        }`}
      >
        {isOpen && (
          <div className="h-full p-6 pt-20 overflow-y-auto">{children}</div>
        )}
      </div>
    </>
  );
};

export default NavSheet;
