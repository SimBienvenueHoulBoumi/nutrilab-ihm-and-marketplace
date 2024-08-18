import React from "react";
import Image from "next/image";

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
              Share your recipe with other users by creating a marketplace.
            </li>
          </ol>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            non enim dignissim, tincidunt neque id, finibus felis. Quisque
            placerat, ex non consectetur faucibus, velit velit tristique velit,
            ac fermentum nunc eros sed velit. Sed vel faucibus felis, in rutrum
            ipsum.
          </p>
        </div>
      </div>

      {/* Section Image */}
      <div className="lg:w-1/2">
        <Image
          src="/images/salade-de-fruits.jpg"
          width={600}
          height={400}
          alt="Salade de fruits"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Fonctionning;
