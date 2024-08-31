"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import CustomInput from "@/components/myInput.components";
import {
  getArticles,
  deleteArticle,
} from "@/services/nutrilab.article.service";
import Article from "@/interfaces/article.interface";
import User from "@/interfaces/user.interface";
import {
  getUserInfo,
  getLocalUserId,
  changePassword,
} from "@/services/auth.service";
import FavoritesSection from "@/components/favoriteSession.components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IFormValues = {
  email: string;
  password: string;
  [key: string]: string;
};

function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleLoading, setArticleLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [localUserId, setLocalUserId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const pagesToShow = 3;

  useEffect(() => {
    fetchUserInfo();
    fetchArticles();
    fetchLocalUserId();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const user = await getUserInfo();
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchArticles = async () => {
    setArticleLoading(true);
    try {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setArticleLoading(false);
    }
  };

  const fetchLocalUserId = async () => {
    try {
      const userId = await getLocalUserId();
      setLocalUserId(userId);
    } catch (error) {
      console.error("Error fetching local user ID:", error);
    }
  };

  const onSubmitChangePassword: SubmitHandler<IFormValues> = async (data) => {
    const { current_password, new_password, confirm_password } = data;

    setLoading(true);

    if (new_password !== confirm_password) {
      toast("Passwords do not match", {
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      if (userInfo) {
        const success = await changePassword(current_password, new_password);
        if (success) {
          toast("Password changed successfully.", {
            type: "success",
          });
          reset();
        }
      } else {
        toast("User information not available. Please refresh and try again.", {
          type: "error",
        });
      }
    } catch (error: any) {
      toast("Failed to change password. Please try again.", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles
    .filter((e) => e.userId === localUserId)
    .slice(indexOfFirstArticle, indexOfLastArticle);

  const totalArticles = articles.filter((e) => e.userId === localUserId).length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - pagesToShow);
    let endPage = Math.min(totalPages, currentPage + pagesToShow);

    if (currentPage <= pagesToShow) {
      endPage = Math.min(totalPages, startPage + pagesToShow * 2);
    }
    if (currentPage >= totalPages - pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow * 2);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => paginate(page)}
          className={`px-4 py-2 mx-1 border rounded-md ${
            currentPage === page
              ? "bg-gray-500"
              : "border-1 border-solid border-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      );
    }

    return pages;
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
      fetchArticles();
    } catch (error) {
      toast("Error deleting article:", {
        type: "error",
      });
    }
  };

  if (localUserId === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#000" size={35} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-full mx-auto py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="border-1 border-solid bg-white border-gray-300 shadow-md rounded-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 bg-[#21b19e] py-1 rounded-sm pl-2 uppercase">
                User Information
              </h2>
              {userInfo ? (
                <div className="mt-4">
                  <p>
                    <strong>First Name:</strong> {userInfo.firstname}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {userInfo.lastname}
                  </p>
                  <p>
                    <strong>Email:</strong> {userInfo.email}
                  </p>
                </div>
              ) : (
                <p className="text-gray-700 text-lg">Loading...</p>
              )}
            </div>

            <div className="border-1 border-solid bg-white border-gray-300 shadow-md rounded-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 bg-[#21b19e] py-1 rounded-sm pl-2 uppercase">
                Change Password
              </h2>
              <form
                onSubmit={handleSubmit(onSubmitChangePassword)}
                className="mt-4 space-y-4"
              >
                <CustomInput
                  type="password"
                  label="Current Password"
                  name="current_password"
                  register={register}
                  required
                />
                <CustomInput
                  type="password"
                  label="New Password"
                  name="new_password"
                  register={register}
                  required
                />
                <CustomInput
                  type="password"
                  label="Confirm New Password"
                  name="confirm_password"
                  register={register}
                  required
                />
                {errors.confirm_password && (
                  <p className="text-red-600 text-sm">
                    {errors.confirm_password.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-md bg-[#20847D] py-2 px-4 text-sm shadow-sm hover:bg-opacity-75 focus:ring-2 focus:ring-sky-400 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <ClipLoader color="#fff" size={20} />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-2">
            <div className="border-1 border-solid bg-white border-gray-300 shadow-md rounded-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 bg-[#21b19e] py-1 rounded-sm pl-2 uppercase">Articles</h2>
              {articleLoading ? (
                <ClipLoader color="#000" size={35} />
              ) : (
                <>
                  {currentArticles.length === 0 ? (
                    <p className="text-gray-700 text-lg">
                      No articles created.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {currentArticles.map((article) => (
                        <li
                          key={article.id}
                          className="flex items-center justify-between border-b border-gray-300 py-2"
                        >
                          <h3 className="text-sm font-semibold">
                            {article.name}
                          </h3>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleDeleteArticle(article.id)}
                              className="bg-red-500 hover:bg-red-200 text-white text-xs px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                            <button
                              className="bg-green-500 hover:bg-green-200 text-white text-xs px-2 py-1 rounded"
                              onClick={() =>
                                (window.location.href = `/marketplace/article-details/${article.id}`)
                              }
                            >
                              Details
                            </button>
                            <button
                              className="bg-blue-500 hover:bg-green-200 text-white text-xs px-2 py-1 rounded"
                              onClick={() =>
                                (window.location.href = `/marketplace/update-article/${article.id}`)
                              }
                            >
                              Update
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Pagination */}
                  <div className="mt-4 flex justify-center">
                    {totalPages > 1 && (
                      <div className="flex space-x-2">
                        {currentPage > 1 && (
                          <button
                            onClick={goToPrevPage}
                            className="px-4 py-2 border rounded-md border-gray-300 text-gray-700"
                          >
                            Prev
                          </button>
                        )}
                        {renderPaginationButtons()}
                        {currentPage < totalPages && (
                          <button
                            onClick={goToNextPage}
                            className="px-4 py-2 border rounded-md border-gray-300 text-gray-700"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            {localUserId && <FavoritesSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
