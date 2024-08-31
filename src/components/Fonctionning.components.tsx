import React from "react";
import Image from "next/image";
import Link from "next/link";

const Fonctionning = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col lg:flex-row items-center lg:items-start">
      {/* Section Texte */}
      <div className="lg:w-1/2 mb-8 lg:mb-0 lg:mr-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          How our site works
        </h1>

        <div className="text-gray-700 space-y-4">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Create your recipe by providing a description of it and how it
              should be cooked to properly represent the basic recipe.
            </li>
            <li>
              Manage your recipe by adding ingredients and steps to make it
              easier for users to understand.
            </li>
            <li>
              You can also save other peoplet&apos;s recipes so you can refer to
              them later without searching for them again.
            </li>
          </ol>
          <p className="mt-4">
            Once your recipe is created, it will be available to all users who
            can view it. Let&apos;s share our culture so that it doesn&apos;t
            disappear with us. Let the world enjoy it with us.
          </p>
          <Link
            href="/marketplace"
            className="mt-6 inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-medium transition hover:bg-green-200"
          >
            Join us for a fantastic culinary adventure
          </Link>
        </div>
      </div>

      {/* Section Image */}
      <div className="lg:w-1/2 relative flex justify-center items-center">
        <div className="relative p-4">
          <Image
            src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
            width="350"
            height="150"
            alt="Salade de fruits"
            className="rounded-lg shadow-lg"
          />
          {/* Soutien de cadre en haut à gauche */}
          <div className="absolute top-0 left-0 w-10 h-10 bg-gray-700"></div>
          {/* Soutien de cadre en bas à droite */}
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Fonctionning;
