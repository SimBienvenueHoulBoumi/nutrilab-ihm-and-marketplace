"use client";

import React, { useState, useEffect } from "react";
import MyGlobalFooter from "@/components/myGlobalFooter.components";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { CONTINENTS, DISCOVERIES } from "@/constantes/local";

export default function Page() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <section className="min-h-screen flex flex-col justify-between">
        {/* Hero Section */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 px-3 lg:px-4 py-6">
          <div className="flex flex-col justify-center space-y-4 p-4 rounded-lg bg-white shadow-md shadow-[#5e6369]">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-200 px-3 py-1 text-sm text-green-800">
                Recipe of the day
              </div>
              <h1 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-4xl md:text-5xl">
                Together we can
              </h1>
              <p className="text-gray-700">
                Cooking brings people together and brings many benefits to our
                body. By cooking together, we strengthen our social bonds and
                create precious memories while taking care of our health. So,
                let&apos;s all share our food together and make each meal a
                moment of conviviality and shared happiness.
              </p>
            </div>
            <div className="flex flex-col min-[400px]:flex-row min-[400px]:space-x-2 space-y-2 min-[400px]:space-y-0">
              <Link
                href="/marketplace"
                className="h-10 p-2 text-center rounded-md bg-green-600 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50"
              >
                See all recipes
              </Link>
              <Link
                href="/login"
                className="h-10 p-2 text-center rounded-md border bg-white border-green-600 bg-transparent text-sm font-medium text-green-600 shadow-sm transition-colors hover:bg-green-600 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50"
              >
                Login or join us now
              </Link>
            </div>
          </div>

          {/* Carousel d'images */}
          <div className="relative w-full max-w-lg mx-auto h-[320px]">
            <AnimatePresence>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt="Dish"
                  width="500"
                  height="500"
                  className="mx-auto p-2 rounded-xl object-cover aspect-[7/5] block"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>

        <div className="w-full mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">CONTINENTS</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CONTINENTS.map((continent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/marketplace?continent=${continent.name}`}>
                  <div
                    className="block h-full rounded-xl border border-gray-300 p-4 shadow-xl transition hover:border-[#2e633c] hover:shadow-[#5e6369]/10 bg-white"
                    onClick={() => {
                      localStorage.setItem("selectedContinent", continent.name);
                    }}
                  >
                    <h2 className="mb-2 bg-gray-100 text-green-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300 inline-block">
                      {continent.name}
                    </h2>

                    <Image
                      src={continent.image}
                      alt={continent.name}
                      width="250"
                      height="150"
                      className="mb-2 rounded-md w-full h-40 object-cover aspect-[1/1] block"
                    />
                    <p className="text-sm text-black">
                      {continent.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          className="w-full py-12 text-center text-white bg-cover bg-center bg-[#87cacc]"
          style={{ backgroundImage: "url('/images/table.png')" }}
        >
          <h2 className="text-3xl font-bold">
            Do you have any ideas to share?
          </h2>
          <p className="mt-4">Do it without further delay.</p>
          <Link
            href="/create-meal"
            className="mt-6 inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-medium transition hover:bg-gray-200"
          >
            create a new recipe
          </Link>
        </div>

        <div className="w-full mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Explore and Share
            </h2>
            <p className="mt-4 text-gray-700">
              Discover new recipes, share culinary knowledge, and connect with a
              community passionate about food.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {DISCOVERIES.map((item, index) => (
              <div
                key={index}
                className="block border border-gray-300 p-8 shadow-sm transition hover:shadow-blue-500/10 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d={`M12 14l9-5-9-5-9 5z`} />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      item.title === "Discover New Recipes"
                        ? "M5 12h14M12 5l7 7-7 7"
                        : item.title === "Share Culinary Knowledge"
                        ? "M16.242 6.343a8 8 0 11-11.314 11.314A8 8 0 0116.242 6.343z"
                        : "M8 12a4 4 0 118 0M8 12H7m9 0h-1m-4-4h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2z"
                    }
                  />
                </svg>
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <MyGlobalFooter />
      </section>
    </>
  );
}
