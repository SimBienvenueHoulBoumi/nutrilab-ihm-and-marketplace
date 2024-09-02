"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import ArticleDetails from "@/components/articleDetails.components";
import ArticlesGrid from "@/components/articleFilter.components";
import Article from "@/interfaces/article.interface";
import { getArticles } from "@/services/nutrilab.article.service";
import CustomSelect from "@/components/customSelect.components";
import { useForm } from "react-hook-form";
import { CONTINENT_OPTIONS } from "@/constantes/continentsOptions";

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = ({}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { register, watch, setValue } = useForm();
  const selectedContinent = watch("continent");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await getArticles();
        setArticles(response);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (selectedContinent) {
      localStorage.setItem("selectedContinent", selectedContinent);
    }
  }, [selectedContinent]);

  const filteredArticles = selectedContinent
    ? articles.filter((article) => article.area === selectedContinent)
    : articles;

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen relative">
      <div className="flex flex-col space-y-4 px-4 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-6">
        <div className="w-full mx-auto">
          <div className="w-64">
            <CustomSelect
              label="Select a continent"
              options={CONTINENT_OPTIONS}
              register={register}
              name="continent"
              required={false}
            />
          </div>
          <Link href="/create-meal">
            <button className="relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 rounded-lg overflow-hidden group">
              <span className="text-white font-semibold ml-8 transition-transform duration-300 transform group-hover:translate-x-20">
                Add Item
              </span>
              <span className="absolute right-0 h-full w-10 flex items-center justify-center transition-all duration-300 bg-green-500 transform group-hover:translate-x-0 group-hover:w-full">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19" />
                  <line x1="5" x2="19" y1="12" y2="12" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : filteredArticles.length > 0 ? (
          <ArticlesGrid
            articles={filteredArticles}
            setSelectedArticle={setSelectedArticle}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  No articles found.
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Choose another category for more options.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedArticle && (
        <ArticleDetails
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
          closeModal={closeModal}
          modalRef={modalRef}
        />
      )}
    </div>
  );
};

export default ProductList;
