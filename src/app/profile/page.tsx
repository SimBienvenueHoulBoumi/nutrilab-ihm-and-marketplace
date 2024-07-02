"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setError,
  } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleLoading, setArticleLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [localUserId, setLocalUserId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const pagesToShow = 3;

  type IFormValues = {
    email: string;
    password: string;
    [key: string]: string;
  };

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
          type: "error"
        });
      }
    } catch (error: any) {
      toast("Failed to change password. Please try again.", {
        type: "error"
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

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-full mx-auto py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-1/3 space-y-4">
            {/* User Information Card */}
            <div className="border-1 border-solid bg-white border-gray-300 shadow-md rounded-md p-6">
              <h2 className="text-3xl font-bold text-gray-900">
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
                <p>Loading user information...</p>
              )}
            </div>
            {/* Update Password Section */}
            <div className="border-1 border-solid bg-white border-gray-300 shadow-md rounded-md p-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Update Password
              </h2>
              <form
                className="space-y-3"
                onSubmit={handleSubmit(onSubmitChangePassword)}
              >
                <div>
                  <CustomInput
                    label="Current Password"
                    name="current_password"
                    type="password"
                    register={register}
                    required
                  />
                  {errors.current_password && (
                    <p className="text-red-600 text-sm">
                      Current password is required.
                    </p>
                  )}
                </div>
                <div>
                  <CustomInput
                    label="New Password"
                    name="new_password"
                    type="password"
                    register={register}
                    required
                  />
                  {errors.new_password && (
                    <p className="text-red-600 text-sm">
                      {errors.new_password.message}
                    </p>
                  )}
                </div>
                <div>
                  <CustomInput
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    register={register}
                    required
                  />
                  {errors.confirm_password && (
                    <p className="text-red-600 text-sm">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
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

          {/* Articles Section */}
          <div className="w-full lg:w-2/3">
            <div className="border-1 border-solid bg-white border-gray-300 shadow-md rounded-md p-6">
              <h2 className="text-3xl font-bold text-gray-900">Articles</h2>
              {articleLoading ? (
                <ClipLoader color="#000" size={35} />
              ) : (
                <>
                  {currentArticles.length === 0 ? (
                    <p className="text-gray-700 text-lg">Aucun article créé.</p>
                  ) : (
                    <table className="w-full mt-4">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            Area
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentArticles.map((article) => (
                          <tr key={article.id} className="bg-white">
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {article.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {article.description}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {article.area}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                              <button
                                className="px-2 py-1 text-xs text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                                onClick={() => handleDeleteArticle(article.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
