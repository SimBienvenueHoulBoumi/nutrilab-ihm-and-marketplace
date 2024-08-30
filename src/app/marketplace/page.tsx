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
          <Link
            href="/create-meal"
            className="bg-blue-500 mt-2 p-2 hover:bg-blue-700 text-white font-bold rounded block w-max"
          >
            + add new article
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
