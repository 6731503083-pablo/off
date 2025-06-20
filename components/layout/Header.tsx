"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, ReactNode } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import CategoryList from "../category/CategoryList";
import FeaturedBox from "../category/FeaturedBox";
import ProductCard from "../product/ProductCard";
import NavIconButton from "../ui/navigation/NavIconButton";
import NavigationLink from "../ui/navigation/NavigationLink";
import SheetContent from "../ui/navigation/SheetContent";

// Type for active nav sheet
type ActiveSheet =
  | "shop"
  | "activities"
  | "explore"
  | "search"
  | "cart"
  | "profile"
  | null;

// Main Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Refs for navigation items
  const shopRef = useRef<HTMLAnchorElement>(null);
  const activitiesRef = useRef<HTMLAnchorElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
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
          <div className="hidden md:flex items-center justify-center flex-1 z-50">
            {isSheetOpen && (
              <div
                className="absolute top-0 right-0 h-16 bg-white"
                style={{
                  width: "60%",
                  animation: "fadeInSlide 0.8s ease-in-out 0.15s both",
                }}
              ></div>
            )}
            <div className="flex space-x-8">
              <NavigationLink
                href="/shop"
                label="Shop"
                isActive={isSheetOpen}
                onMouseEnter={() => handleNavHover("shop")}
                onClick={(e) => {
                  if (isSheetOpen) {
                    e.preventDefault();
                    handleNavHover("shop");
                  }
                }}
                linkRef={shopRef}
              />
              <NavigationLink
                href="/activities"
                label="Activities"
                isActive={isSheetOpen}
                onMouseEnter={() => handleNavHover("activities")}
                onClick={(e) => {
                  if (isSheetOpen) {
                    e.preventDefault();
                    handleNavHover("activities");
                  }
                }}
                linkRef={activitiesRef}
              />
              <NavigationLink
                href="/explore"
                label="Explore"
                isActive={isSheetOpen}
                onMouseEnter={() => handleNavHover("explore")}
                onClick={(e) => {
                  if (isSheetOpen) {
                    e.preventDefault();
                    handleNavHover("explore");
                  }
                }}
                linkRef={exploreRef}
              />
            </div>
          </div>

          {/* Right icons - at very right */}
          <div className="hidden md:flex items-center space-x-6 z-50">
            <NavIconButton
              icon={<Search className="h-6 w-6" />}
              label="Search"
              isActive={isSheetOpen}
              onMouseEnter={() => handleNavHover("search")}
              buttonRef={searchButtonRef}
            />
            <NavIconButton
              icon={<ShoppingCart className="h-6 w-6" />}
              label="Cart"
              isActive={isSheetOpen}
              onMouseEnter={() => handleNavHover("cart")}
              buttonRef={cartRef}
              badge={0}
            />
            <NavIconButton
              icon={<User className="h-6 w-6" />}
              label="Profile"
              isActive={isSheetOpen}
              onMouseEnter={() => handleNavHover("profile")}
              buttonRef={profileRef}
            />
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
              <SheetContent title="Shop">
                <div className="grid grid-cols-3 gap-8">
                  <CategoryList
                    title="Categories"
                    items={[
                      { label: "Men's", href: "/shop/mens" },
                      { label: "Women's", href: "/shop/womens" },
                      { label: "Gear", href: "/shop/gear" },
                      { label: "Accessories", href: "/shop/accessories" },
                    ]}
                  />

                  <CategoryList
                    title="Featured"
                    items={[
                      { label: "New Arrivals", href: "/shop/new-arrivals" },
                      { label: "Best Sellers", href: "/shop/best-sellers" },
                      { label: "Sale", href: "/shop/sale" },
                    ]}
                  />

                  <FeaturedBox
                    title="Summer Collection"
                    description="Discover our latest summer gear for all your adventures."
                    linkText="Shop Now"
                    linkHref="/shop/summer"
                  />
                </div>
              </SheetContent>
            )}

            {/* Activities Sheet Content */}
            {activeSheet === "activities" && (
              <SheetContent title="Activities">
                <div className="grid grid-cols-3 gap-8">
                  <CategoryList
                    title="Outdoor"
                    items={[
                      { label: "Hiking", href: "/activities/hiking" },
                      { label: "Camping", href: "/activities/camping" },
                      { label: "Climbing", href: "/activities/climbing" },
                      {
                        label: "Trail Running",
                        href: "/activities/trail-running",
                      },
                    ]}
                  />

                  <CategoryList
                    title="Water"
                    items={[
                      { label: "Kayaking", href: "/activities/kayaking" },
                      { label: "Swimming", href: "/activities/swimming" },
                      { label: "Fishing", href: "/activities/fishing" },
                    ]}
                  />

                  <FeaturedBox
                    title="Featured Activity"
                    description="Discover top spots for rock climbing this season."
                    linkText="View Guide"
                    linkHref="/activities/climbing-guide"
                  />
                </div>
              </SheetContent>
            )}

            {/* Explore Sheet Content */}
            {activeSheet === "explore" && (
              <SheetContent title="Explore">
                <div className="grid grid-cols-3 gap-8">
                  <CategoryList
                    title="Locations"
                    items={[
                      {
                        label: "National Parks",
                        href: "/explore/national-parks",
                      },
                      { label: "Beaches", href: "/explore/beaches" },
                      { label: "Mountains", href: "/explore/mountains" },
                      { label: "Forests", href: "/explore/forests" },
                    ]}
                  />

                  <CategoryList
                    title="Guides"
                    items={[
                      { label: "For Beginners", href: "/explore/beginners" },
                      { label: "For Experts", href: "/explore/experts" },
                      { label: "Family Adventures", href: "/explore/family" },
                    ]}
                  />

                  <FeaturedBox
                    title="Featured Guide"
                    description="Essential tips for your next backcountry adventure."
                    linkText="Read More"
                    linkHref="/explore/backcountry"
                  />
                </div>
              </SheetContent>
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
                    {[
                      "Hiking Boots",
                      "Rain Jackets",
                      "Tents",
                      "Backpacks",
                      "Water Bottles",
                      "Sleeping Bags",
                      "Climbing Gear",
                      "Camping Chairs",
                    ].map((term, i) => (
                      <button
                        key={i}
                        className="px-3 py-1.5 border border-gray-300 hover:border-black hover:cursor-pointer rounded-full text-gray-800 text-lg"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Products
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    <ProductCard
                      href="/product/1"
                      imageSrc="/product.jpg"
                      title="Hiking Backpack Pro"
                      price={49.99}
                      rating={5}
                      reviewCount={42}
                      colorOptions={[
                        { color: "blue-500", label: "Blue" },
                        { color: "red-500", label: "Red" },
                        { color: "gray-700", label: "Black" },
                        { color: "green-600", label: "Green" },
                      ]}
                    />

                    <ProductCard
                      href="/product/2"
                      imageSrc="/product.jpg"
                      title="Waterproof Hiking Jacket"
                      price={89.99}
                      originalPrice={129.99}
                      rating={5}
                      reviewCount={76}
                      colorOptions={[
                        { color: "yellow-500", label: "Yellow" },
                        { color: "gray-300", label: "Gray" },
                        { color: "orange-600", label: "Orange" },
                      ]}
                    />

                    <ProductCard
                      href="/product/3"
                      imageSrc="/product.jpg"
                      title="Waterproof Hiking Jacket"
                      price={89.99}
                      originalPrice={129.99}
                      rating={5}
                      reviewCount={76}
                      colorOptions={[
                        { color: "yellow-500", label: "Yellow" },
                        { color: "gray-300", label: "Gray" },
                        { color: "orange-600", label: "Orange" },
                      ]}
                    />

                    <ProductCard
                      href="/product/4"
                      imageSrc="/product.jpg"
                      title="Waterproof Hiking Jacket"
                      price={89.99}
                      originalPrice={129.99}
                      rating={5}
                      reviewCount={76}
                      colorOptions={[
                        { color: "yellow-500", label: "Yellow" },
                        { color: "gray-300", label: "Gray" },
                        { color: "orange-600", label: "Orange" },
                      ]}
                    />
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
              <SheetContent title="Your Cart">
                <div className="space-y-4">
                  <p className="text-gray-600">Your cart is empty.</p>
                  <Link
                    href="/shop"
                    className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                  >
                    Start Shopping
                  </Link>
                </div>
              </SheetContent>
            )}

            {/* Profile Sheet Content */}
            {activeSheet === "profile" && (
              <SheetContent title="Your Account">
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
              </SheetContent>
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
