import MyBanner from "@/components/myBanner.components"
import MyGlobalFooter from "@/components/myGlobalFooter.components";
import Offres from "@/components/offers.components"

import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="h-full py-0 md:py-0 lg:py-0 bg-gradient-to-r from-[#9bee75] to-[#DFAF2C]">
        <div className="w-full px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 py-20">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700 dark:text-gray-400">
                recipe of the day
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Tarte aux pommes caramélisées
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Une recette réconfortante et délicieuse, parfaite pour un dessert en famille ou entre amis.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Show recipe details
              </a>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-green-400 bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                save this recipe
              </a>
            </div>
          </div>
          <Image
            src="/images/salade-de-fruits.jpg"
            alt="Recette phare"
            width="700"
            height="500"
            className="mx-auto rounded-xl object-cover aspect-[7/5]"
          />
        </div>
      </section>
      <footer className="bg-[#DFAF2C] w-full text-center">
        <MyGlobalFooter />
      </footer>
    </>

  );
}