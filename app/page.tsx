"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative">
      {/* Hero section with background image */}
      <div className="relative h-screen">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Outdoor adventure background"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-end text-white px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              The performance running collection
            </h1>
            <p className="text-xl sm:text-2xl mb-8">
              Own your run with our performance running gear.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/shop"
                className="px-8 py-3 bg-white text-gray-900 rounded-4xl font-medium hover:bg-opacity-90 transition-all"
              >
                Shop Women's
              </Link>
              <Link
                href="/explore"
                className="px-8 py-3 bg-white rounded-4xl font-medium hover:bg-opacity-90 text-gray-900 transition-all"
              >
                Shop Men's
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories Section - no animation */}
      <div className="min-h-screen h-full flex flex-col pt-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-6xl font-bold mb-24 text-start">
            Featured Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
            {/* Category 1 */}
            <div className="flex flex-col h-full">
              <div className="relative overflow-hidden rounded-lg shadow-lg group flex-grow">
                <Image
                  src="/category-one.jpg"
                  alt="Category One"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-500 
                  cursor-pointer group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white justify-between flex items-center">
                  <Link
                    href="/category/hiking"
                    className="group inline-flex items-center text-white text-2xl font-bold relative"
                  >
                    <span className="relative">
                      Shoes
                      <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <span className="ml-2 transform translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Category 2 */}
            <div className="flex flex-col h-full">
              <div className="relative overflow-hidden rounded-lg shadow-lg group flex-grow">
                <Image
                  src="/category-two.jpg"
                  alt="Category Two"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white justify-between flex items-center">
                  <Link
                    href="/category/hiking"
                    className="group inline-flex items-center text-white text-2xl font-bold relative"
                  >
                    <span className="relative">
                      Apparel
                      <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <span className="ml-2 transform translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Category 3 */}
            <div className="flex flex-col h-full">
              <div className="relative overflow-hidden rounded-lg shadow-lg group flex-grow">
                <Image
                  src="/category-three.jpg"
                  alt="Category Three"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white justify-between flex items-center">
                  <Link
                    href="/category/hiking"
                    className="group inline-flex items-center text-white text-2xl font-bold relative"
                  >
                    <span className="relative">
                      Accessories
                      <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <span className="ml-2 transform translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
    </div>
  );
}
