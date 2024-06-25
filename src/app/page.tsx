"use client"

import React from "react";
import MyGlobalFooter from "@/components/myGlobalFooter.components";
import Image from "next/image";
import Link from 'next/link';

const continents = [
  {
    name: 'Africa',
    image: 'https://cdn.vox-cdn.com/thumbor/rUGETRBBZ_nGJmNu7KEdhC518Gc=/0x0:1440x1043/1200x900/filters:focal(605x407:835x637)/cdn.vox-cdn.com/uploads/chorus_image/image/72478785/87739329_804306083385235_9206929407397068800_n.0.jpeg',
    description: 'Known for its diverse and vibrant cuisine, African dishes often feature rich, bold flavors, using ingredients like yams, cassava, and a variety of spices.'
  },
  {
    name: 'Asia',
    image: 'https://www.amc.info/fileadmin/_processed_/1/c/csm_Article_15_Header_wok_Asian_spices_2e5ac9f99e.jpg',
    description: 'Asian cuisine is famous for its variety and complexity, incorporating rice, noodles, and an array of vegetables, meats, and seafood with distinctive spices and flavors.'
  },
  {
    name: 'Europe',
    image: 'https://www.bedeo.fr/wp-content/uploads/2023/12/voyage-et-gastronomie-3A-a-la-decouverte-des-cuisines-du-monde.jpg',
    description: 'European cuisine is characterized by its regional diversity, with French, Italian, and Spanish cuisines offering an array of breads, cheeses, meats, and wines.'
  },
  {
    name: 'North America',
    image: 'https://cdn.tasteatlas.com//images/dishes/fdf786cdd7c24e29bb5ada7154d4cad9.jpg?w=375&h=280',
    description: 'North American cuisine includes a blend of Native American, European, and African influences, featuring dishes like burgers, BBQ, and a wide range of desserts.'
  },
  {
    name: 'South America',
    image: 'https://www.classadventuretravel.com/wp-content/uploads/2014/04/Brazil.jpg',
    description: 'South American cuisine is known for its vibrant flavors and ingredients such as corn, potatoes, and beans, with popular dishes like empanadas, ceviche, and feijoada.'
  },
  {
    name: 'Australia',
    image: 'https://www.paramount21.co.uk/wp-content/uploads/2015/02/Casual-Dining-OT5-2019-LR2-e1642768198449.jpg',
    description: 'Australian cuisine reflects its multicultural society, with a strong emphasis on fresh, local ingredients including seafood, meats, and native bush foods.'
  },
  {
    name: 'Antarctica',
    image: 'https://images.squarespace-cdn.com/content/v1/55ee34aae4b0bf70212ada4c/1594043992358-NSEZ098QL7T8AOG2DMWH/eric-mcnew-xXzJ6mpcdwY-unsplash.jpg',
    description: 'Antarctic cuisine is primarily expedition-based, featuring hearty, high-energy meals necessary for the extreme conditions, often using preserved and canned foods.'
  }
];

export default function Page() {
  return (
    <>
      <section className="min-h-screen flex flex-col justify-between">
        {/* Hero Section */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 lg:px-8 py-12">
          <div className="flex flex-col justify-center space-y-4 p-6 rounded-lg bg-white shadow-md shadow-[#5e6369]">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-200 px-3 py-1 text-sm text-green-800">
                Recipe of the day
              </div>
              <h1 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-4xl md:text-5xl">
                Together we can
              </h1>
              <p className="text-gray-700">
                Cooking brings people together and brings many benefits to our body. By cooking together,
                we strengthen our social bonds and create precious memories while taking care of our health.
                So, let&apos;s all share our food together and make each meal a moment of conviviality and shared happiness.
              </p>
            </div>
            <div className="flex flex-col min-[400px]:flex-row min-[400px]:space-x-2 space-y-2 min-[400px]:space-y-0">
              <Link href="/marketplace" className="h-10 p-2 text-center rounded-md bg-green-600 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50">
                See all recipes
              </Link>
              <Link href="/login" className="h-10 p-2 text-center rounded-md border bg-white border-green-600 bg-transparent text-sm font-medium text-green-600 shadow-sm transition-colors hover:bg-green-600 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50">
                Login or join us now
              </Link>
            </div>
          </div>
          <Image
            src="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
            alt="Dish"
            width="400"
            height="400"
            className="mx-auto p-2 rounded-xl object-cover aspect-[7/5] block"
          />
        </div>

        {/* Continent Showcase */}
        <div className="w-full mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Continents</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {continents.map((continent, index) => (
              <Link key={index} href={`/marketplace?continent=${continent.name}`}>
                <div className="block h-full rounded-xl border border-gray-300 p-4 shadow-xl transition hover:border-[#5e6369] hover:shadow-[#5e6369]/10 bg-white"
                  onClick={
                    () => {
                      localStorage.setItem('selectedContinent', continent.name);
                    }}>
                  <Image
                    src={continent.image}
                    alt={continent.name}
                    width="300"
                    height="150"
                    className="mb-4 rounded-md w-full object-cover aspect-[1/1] block"
                  />
                  <h2 className="mt-4 text-xl font-bold text-gray-900">{continent.name}</h2>
                  <p className="mt-2 text-sm text-gray-600">{continent.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="w-full py-12 text-center text-black bg-cover bg-center bg-[#87cacc]" style={{ backgroundImage: "url('/images/banner.jpg')" }}>
          <h2 className="text-3xl font-bold">Do you have any ideas to share?</h2>
          <p className="mt-4">Do it without further delay.</p>
          <Link href="/create-meal" className="mt-6 inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-medium transition hover:bg-gray-200">
            create a new recipe
          </Link>
        </div>

        {/* Marketing Section */}
        <div className="w-full mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">Explore and Share</h2>
            <p className="mt-4 text-gray-700">
              Discover new recipes, share culinary knowledge, and connect with a community passionate about food.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Discover New Recipes',
                description: 'Explore a variety of recipes from around the world and expand your culinary horizons.',
                icon: 'book-open'
              },
              {
                title: 'Share Culinary Knowledge',
                description: 'Share your cooking tips, techniques, and recipes with a community of food enthusiasts.',
                icon: 'academic-cap'
              },
              {
                title: 'Connect with Food Lovers',
                description: 'Join a vibrant community of food lovers to exchange ideas, experiences, and inspirations.',
                icon: 'users'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="block rounded-xl border border-gray-300 p-8 shadow-sm transition  hover:shadow-blue-500/10 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d={`M12 14l9-5-9-5-9 5 9 5z`} />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      item.title === 'Discover New Recipes'
                        ? 'M5 12h14M12 5l7 7-7 7'
                        : item.title === 'Share Culinary Knowledge'
                          ? 'M16.242 6.343a8 8 0 11-11.314 11.314A8 8 0 0116.242 6.343z'
                          : 'M8 12a4 4 0 118 0M8 12H7m9 0h-1m-4-4h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2z'
                    }
                  />
                </svg>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{item.title}</h2>
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
