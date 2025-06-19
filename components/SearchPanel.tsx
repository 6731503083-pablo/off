"use client";

import { useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  searchButtonRef: React.RefObject<HTMLButtonElement>;
}

const SearchPanel = ({
  isOpen,
  onClose,
  searchButtonRef,
}: SearchPanelProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchSheetRef = useRef<HTMLDivElement>(null);

  // Handle search sheet opening/closing and focus
  useEffect(() => {
    if (isOpen) {
      // Focus the search input when opened
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }

      // Disable scrolling on body
      document.body.style.overflow = "hidden";
      document.body.classList.add("search-open");

      // Add event listener to close search when clicking outside
      const handleClickOutside = (event: MouseEvent) => {
        if (
          searchSheetRef.current &&
          !searchSheetRef.current.contains(event.target as Node) &&
          searchButtonRef.current !== event.target &&
          !searchButtonRef.current?.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Re-enable scrolling when unmounted or when search is closed
        document.body.style.overflow = "";
        document.body.classList.remove("search-open");
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      // Re-enable scrolling when search is closed
      document.body.style.overflow = "";
      document.body.classList.remove("search-open");
    }
  }, [isOpen, onClose, searchButtonRef]);

  return (
    <>
      {/* Invisible overlay with cursor:pointer when search is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent cursor-pointer z-30"
          onClick={onClose}
        ></div>
      )}

      {/* Search Sheet */}
      <div
        ref={searchSheetRef}
        className={`fixed top-0 right-0 h-screen bg-white shadow-lg transition-all duration-400 z-40 ${
          isOpen ? "w-3/5" : "w-0"
        }`}
      >
        {isOpen && (
          <div className="h-full p-6 pt-20 overflow-y-auto">
            <div className="flex items-center border-b border-gray-200 pb-3 mb-6 mt-8 ">
              <Search className="h-5 w-5 text-gray-500 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products..."
                className="w-full border-none text-gray-900 focus:outline-none bg-transparent"
                aria-label="Search"
              />
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-4">
                <button
                  className="px-3 py-1.5 
                border border-gray-300 hover:border-black
                hover:cursor-pointer rounded-full text-gray-800 text-lg"
                >
                  Hiking Boots
                </button>
                <button
                  className="px-3 py-1.5 border border-gray-300 hover:border-black
                hover:cursor-pointer rounded-full text-gray-800 text-lg"
                >
                  Rain Jackets
                </button>
                <button
                  className="px-3 py-1.5 border border-gray-300 hover:border-black
                hover:cursor-pointer rounded-full text-gray-800 text-lg"
                >
                  Tents
                </button>
                <button
                  className="px-3 py-1.5 border border-gray-300 hover:border-black
                hover:cursor-pointer rounded-full text-gray-800 text-lg"
                >
                  Backpacks
                </button>
                <button
                  className="px-3 py-1.5 border border-gray-300 hover:border-black
                hover:cursor-pointer rounded-full text-gray-800 text-lg"
                >
                  Camping Gear
                </button>
                <button
                  className="px-3 py-1.5 border border-gray-300 hover:border-black
                hover:cursor-pointer rounded-full text-gray-800 text-lg"
                >
                  Outdoor Clothing
                </button>
                <button
                  className="px-3 py-1.5 border border-gray-300 hover:border-black
                hover:cursor-pointer rounded-full text-gray-800 text-lg"
                >
                  Climbing Gear
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Products
              </h3>
              {/* Products content */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPanel;
