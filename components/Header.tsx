"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

// Type for active nav sheet
type ActiveSheet =
  | "shop"
  | "activities"
  | "explore"
  | "search"
  | "cart"
  | "profile"
  | null;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Refs for navigation items
  const shopRef = useRef<HTMLAnchorElement>(null);
  const activitiesRef = useRef<HTMLAnchorElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null!);
  const cartRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);

  // Ref for the sheet container
  const sheetRef = useRef<HTMLDivElement>(null);

  // Function to handle navigation hover
  const handleNavHover = (sheet: ActiveSheet) => {
    // If the sheet is already open, just change content
    if (isSheetOpen) {
      setActiveSheet(sheet);
    } else {
      // Otherwise open the sheet with this content
      setActiveSheet(sheet);
      setIsSheetOpen(true);
    }
  };

  // Function to close active sheet
  const closeSheet = () => {
    setIsSheetOpen(false);
    setActiveSheet(null);
  };

  // Handle click outside to close sheet
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSheetOpen &&
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node) &&
        !shopRef.current?.contains(event.target as Node) &&
        !activitiesRef.current?.contains(event.target as Node) &&
        !exploreRef.current?.contains(event.target as Node) &&
        !searchButtonRef.current?.contains(event.target as Node) &&
        !cartRef.current?.contains(event.target as Node) &&
        !profileRef.current?.contains(event.target as Node)
      ) {
        closeSheet();
      }
    };

    // Only listen for mousedown events (clicks)
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSheetOpen]);

  // Disable scrolling when sheet is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSheetOpen]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo - at very start */}
          <div className="flex-shrink-0 flex items-center z-50 mr-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={160}
                height={80}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div
            className={`hidden md:flex items-center justify-center flex-1 z-50`}
          >
            <div className="flex space-x-8">
              <Link
                ref={shopRef}
                href="/shop"
                className={`group inline-flex items-center relative ${
                  isSheetOpen ? "text-gray-900" : "text-white"
                }`}
                onMouseEnter={() => handleNavHover("shop")}
                onClick={(e) => {
                  if (isSheetOpen) {
                    e.preventDefault();
                    handleNavHover("shop");
                  }
                }}
              >
                <span className="relative font-bold text-lg">
                  Shop
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                      isSheetOpen ? "bg-gray-900" : "bg-white"
                    }`}
                  ></span>
                </span>
              </Link>
              <Link
                ref={activitiesRef}
                href="/activities"
                className={`group inline-flex items-center relative ${
                  isSheetOpen ? "text-gray-900" : "text-white"
                }`}
                onMouseEnter={() => handleNavHover("activities")}
                onClick={(e) => {
                  if (isSheetOpen) {
                    e.preventDefault();
                    handleNavHover("activities");
                  }
                }}
              >
                <span className="relative font-bold text-lg">
                  Activities
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                      isSheetOpen ? "bg-gray-900" : "bg-white"
                    }`}
                  ></span>
                </span>
              </Link>
              <Link
                ref={exploreRef}
                href="/explore"
                className={`group inline-flex items-center relative ${
                  isSheetOpen ? "text-gray-900" : "text-white"
                }`}
                onMouseEnter={() => handleNavHover("explore")}
                onClick={(e) => {
                  if (isSheetOpen) {
                    e.preventDefault();
                    handleNavHover("explore");
                  }
                }}
              >
                <span className="relative font-bold text-lg">
                  Explore
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                      isSheetOpen ? "bg-gray-900" : "bg-white"
                    }`}
                  ></span>
                </span>
              </Link>
            </div>
          </div>

          {/* Right icons - at very right */}
          <div className="hidden md:flex items-center space-x-6 z-50">
            <button
              ref={searchButtonRef}
              aria-label="Search"
              className={` rounded-full p-2 transition-colors duration-300 
                relative hover:bg-gray-200 focus:ring-2 focus:ring-gray-500
                ${isSheetOpen ? "text-gray-900 " : "text-white"}`}
              onMouseEnter={() => handleNavHover("search")}
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              ref={cartRef}
              aria-label="Cart"
              className={`hover:bg-gray-200 rounded-full p-2 transition-colors duration-300 focus:ring-2 focus:ring-gray-500
                relative ${isSheetOpen ? "text-gray-900" : "text-white"}`}
              onMouseEnter={() => handleNavHover("cart")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button
              ref={profileRef}
              aria-label="Profile"
              className={`hover:bg-gray-200
                rounded-full p-2 transition-colors duration-300 focus:ring-2 focus:ring-gray-500
                relative ${isSheetOpen ? "text-gray-900" : "text-white"}`}
              onMouseEnter={() => handleNavHover("profile")}
            >
              <User className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center z-50">
            <button
              type="button"
              className={`focus:outline-none ${
                isSheetOpen ? "text-gray-900" : "text-white"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Combined Sheet with Dynamic Content */}
      <div
        ref={sheetRef}
        className={`fixed top-0 right-0 h-screen bg-white shadow-lg transition-all duration-400 z-40 ${
          isSheetOpen ? "w-3/5" : "w-0"
        }`}
        onMouseEnter={() => setIsSheetOpen(true)}
      >
        {isSheetOpen && (
          <div className="h-full p-6 pt-20 overflow-y-auto">
            {/* Shop Sheet Content */}
            {activeSheet === "shop" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop</h2>

                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Categories
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/shop/mens"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Men's
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop/womens"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Women's
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop/gear"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Gear
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop/accessories"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Featured
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/shop/new-arrivals"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          New Arrivals
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop/best-sellers"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Best Sellers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop/sale"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Sale
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Summer Collection
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Discover our latest summer gear for all your adventures.
                    </p>
                    <Link
                      href="/shop/summer"
                      className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Activities Sheet Content */}
            {activeSheet === "activities" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Activities
                </h2>

                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Outdoor
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/activities/hiking"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Hiking
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/activities/camping"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Camping
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/activities/climbing"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Climbing
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/activities/trail-running"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Trail Running
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Water
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/activities/kayaking"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Kayaking
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/activities/swimming"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Swimming
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/activities/fishing"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Fishing
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Featured Activity
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Discover top spots for rock climbing this season.
                    </p>
                    <Link
                      href="/activities/climbing-guide"
                      className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                    >
                      View Guide
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Explore Sheet Content */}
            {activeSheet === "explore" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Explore
                </h2>

                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Locations
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/explore/national-parks"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          National Parks
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/explore/beaches"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Beaches
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/explore/mountains"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Mountains
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/explore/forests"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Forests
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Guides
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/explore/beginners"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          For Beginners
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/explore/experts"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          For Experts
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/explore/family"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Family Adventures
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Featured Guide
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Essential tips for your next backcountry adventure.
                    </p>
                    <Link
                      href="/explore/backcountry"
                      className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Search Sheet Content */}
            {activeSheet === "search" && (
              <div>
                <div className="flex items-center border-b border-gray-200 pb-3 mb-6 mt-8">
                  <Search className="h-5 w-5 text-gray-500 mr-3" />
                  <input
                    autoFocus
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
                    <button className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg">
                      Hiking Boots
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg">
                      Rain Jackets
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg">
                      Tents
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg">
                      Backpacks
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg">
                      Water Bottles
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg">
                      Sleeping Bags
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg">
                      Climbing Gear
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg">
                      Camping Chairs
                    </button>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Products
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    <Link
                      href="/product/1"
                      className="group block rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative">
                        {/* Main product image */}
                        <Image
                          src="/product.jpg"
                          alt="Hiking Backpack Pro"
                          width={1000}
                          height={1000}
                          className="w-full h-64 object-cover"
                        />
                      </div>

                      {/* Color/variation options */}
                      <div className="px-4 pt-3 pb-1">
                        <div className="flex space-x-2 mb-2">
                          <button
                            className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-sm"
                            aria-label="Blue variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow-sm"
                            aria-label="Red variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-gray-700 border-2 border-white shadow-sm"
                            aria-label="Black variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-green-600 border-2 border-white shadow-sm"
                            aria-label="Green variant"
                          ></button>
                        </div>

                        {/* Product details */}
                        <h4 className="font-semibold text-gray-900 text-lg mb-1 leading-tight">
                          Hiking Backpack Pro
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">$49.99</p>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="flex text-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <span className="ml-1 text-gray-500">(42)</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/product/2"
                      className="group block rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative">
                        {/* Main product image */}
                        <Image
                          src="/product.jpg"
                          alt="Waterproof Hiking Jacket"
                          width={1000}
                          height={1000}
                          className="w-full h-64 object-cover"
                        />
                      </div>

                      {/* Color/variation options */}
                      <div className="px-4 pt-3 pb-1">
                        <div className="flex space-x-2 mb-2">
                          <button
                            className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-white shadow-sm"
                            aria-label="Yellow variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white shadow-sm"
                            aria-label="Gray variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-orange-600 border-2 border-white shadow-sm"
                            aria-label="Orange variant"
                          ></button>
                        </div>

                        {/* Product details */}
                        <h4 className="font-semibold text-gray-900 text-lg mb-1 leading-tight">
                          Waterproof Hiking Jacket
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">
                              <span className="line-through text-gray-400 mr-2">
                                $129.99
                              </span>
                              <span className="text-red-600 font-medium">
                                $89.99
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="flex text-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <span className="ml-1 text-gray-500">(76)</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/product/2"
                      className="group block rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative">
                        {/* Main product image */}
                        <Image
                          src="/product.jpg"
                          alt="Waterproof Hiking Jacket"
                          width={1000}
                          height={1000}
                          className="w-full h-64 object-cover"
                        />
                      </div>

                      {/* Color/variation options */}
                      <div className="px-4 pt-3 pb-1">
                        <div className="flex space-x-2 mb-2">
                          <button
                            className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-white shadow-sm"
                            aria-label="Yellow variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white shadow-sm"
                            aria-label="Gray variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-orange-600 border-2 border-white shadow-sm"
                            aria-label="Orange variant"
                          ></button>
                        </div>

                        {/* Product details */}
                        <h4 className="font-semibold text-gray-900 text-lg mb-1 leading-tight">
                          Waterproof Hiking Jacket
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">
                              <span className="line-through text-gray-400 mr-2">
                                $129.99
                              </span>
                              <span className="text-red-600 font-medium">
                                $89.99
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="flex text-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <span className="ml-1 text-gray-500">(76)</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/product/2"
                      className="group block rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative">
                        {/* Main product image */}
                        <Image
                          src="/product.jpg"
                          alt="Waterproof Hiking Jacket"
                          width={1000}
                          height={1000}
                          className="w-full h-64 object-cover"
                        />
                      </div>

                      {/* Color/variation options */}
                      <div className="px-4 pt-3 pb-1">
                        <div className="flex space-x-2 mb-2">
                          <button
                            className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-white shadow-sm"
                            aria-label="Yellow variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white shadow-sm"
                            aria-label="Gray variant"
                          ></button>
                          <button
                            className="w-5 h-5 rounded-full bg-orange-600 border-2 border-white shadow-sm"
                            aria-label="Orange variant"
                          ></button>
                        </div>

                        {/* Product details */}
                        <h4 className="font-semibold text-gray-900 text-lg mb-1 leading-tight">
                          Waterproof Hiking Jacket
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">
                              <span className="line-through text-gray-400 mr-2">
                                $129.99
                              </span>
                              <span className="text-red-600 font-medium">
                                $89.99
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="flex text-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <span className="ml-1 text-gray-500">(76)</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="text-center mt-6">
                    <Link
                      href="/shop"
                      className="inline-block 
                      rounded-3xl text-lg
                      px-4 py-2 bg-gray-900 text-white hover:bg-gray-800"
                    >
                      Load More
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Sheet Content */}
            {activeSheet === "cart" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Cart
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-600">Your cart is empty.</p>

                  <Link
                    href="/shop"
                    className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}

            {/* Profile Sheet Content */}
            {activeSheet === "profile" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Account
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      Sign In
                    </h3>
                    <p className="text-gray-600">
                      Sign in to your account to view orders and manage your
                      details.
                    </p>
                    <div className="flex space-x-4 mt-4">
                      <Link
                        href="/login"
                        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="px-4 py-2 border border-gray-300 rounded hover:border-gray-500"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay when any sheet is active - only for click handling */}
      {isSheetOpen && (
        <div
          className="fixed inset-0 bg-transparent cursor-pointer z-30"
          onClick={closeSheet}
        ></div>
      )}

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/shop"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Shop
            </Link>
            <Link
              href="/activities"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Activities
            </Link>
            <Link
              href="/explore"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Explore
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-around px-5">
              <button
                aria-label="Search"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => {
                  handleNavHover("search");
                  setIsMenuOpen(false);
                }}
              >
                <Search className="h-6 w-6" />
              </button>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-gray-900 relative"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-gray-900"
              >
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
