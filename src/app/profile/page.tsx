"use client"

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import CustomInput from '@/components/myInput.components';
import { IFormValues } from '@/types/formValues.types';
import { getArticles, deleteArticle } from '@/services/nutrilab.article.service'; // Assuming you have a deleteArticle function
import Article from '@/interfaces/article.interface';
import User from '@/interfaces/user.interface';

import { getUserInfo, getLocalUserId } from '@/services/auth.service';

function Profile() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleLoading, setArticleLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();
  const [localUserId, setLocalUserId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const pagesToShow = 3; // Number of pages to show before and after the current page

  useEffect(() => {
    fetchUserInfo();
    fetchArticles();
    fetchLocalUserId();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setUserInfo(await getUserInfo())
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchArticles = async () => {
    setArticleLoading(true);
    try {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setArticleLoading(false);
    }
  };

  const fetchLocalUserId = async () => {
    try {
      const userId = await getLocalUserId();
      setLocalUserId(userId);
    } catch (error) {
      console.error('Error fetching local user ID:', error);
    }
  };

  const onSubmitPassword: SubmitHandler<IFormValues> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles
    .filter(e => e.userId === localUserId)
    .slice(indexOfFirstArticle, indexOfLastArticle);

  const totalArticles = articles.filter(e => e.userId === localUserId).length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - pagesToShow);
    let endPage = Math.min(totalPages, currentPage + pagesToShow);

    if (currentPage <= pagesToShow) {
      endPage = Math.min(totalPages, startPage + (pagesToShow * 2));
    }
    if (currentPage >= totalPages - pagesToShow) {
      startPage = Math.max(1, endPage - (pagesToShow * 2));
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => paginate(page)}
          className={`px-4 py-2 mx-1 border rounded-md ${currentPage === page ? 'bg-gray-500 text-white' : 'bg-white text-gray-700'}`}
        >
          {page}
        </button>
      );
    }

    return pages;
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await deleteArticle(articleId); 
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9bee75] to-[#DFAF2C] px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-1/3 space-y-4">
            {/* User Information Card */}
            <div className="bg-white shadow-md rounded-md p-6">
              <h2 className="text-3xl font-bold text-gray-900">User Information</h2>
              {userInfo ? (
                <div className="mt-4">
                  <p><strong>First Name:</strong> {userInfo.firstname}</p>
                  <p><strong>Last Name:</strong> {userInfo.lastname}</p>
                  <p><strong>Email:</strong> {userInfo.email}</p>
                </div>
              ) : (
                <p>Loading user information...</p>
              )}
            </div>
            {/* Update Password Section */}
            <div className="bg-white shadow-md rounded-md p-6">
              <h2 className="text-3xl font-bold text-gray-900">Update Password</h2>
              <form className="space-y-3" onSubmit={handleSubmit(onSubmitPassword)}>
                <CustomInput
                  label="Current Password"
                  name="current_password"
                  type="password"
                  register={register}
                  required
                />
                <CustomInput
                  label="New Password"
                  name="new_password"
                  type="password"
                  register={register}
                  required
                />
                <CustomInput
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  register={register}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-md bg-[#20847D] py-2 px-4 text-sm text-white shadow-sm hover:bg-opacity-75 focus:ring-2 focus:ring-sky-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? <ClipLoader color="#fff" size={20} /> : 'Update Password'}
                </button>
              </form>
            </div>
          </div>

          {/* Articles Section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white shadow-md rounded-md p-6">
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Area</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentArticles.map((article) => (
                          <tr key={article.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{article.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{article.description}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{article.area}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <button
                                onClick={() => handleDeleteArticle(article.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                              >
                                Supprimer
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 mx-1 border rounded-md ${currentPage === 1 ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-white text-gray-700'}`}
                    >
                      Prev
                    </button>
                    {renderPaginationButtons()}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 mx-1 border rounded-md ${currentPage === totalPages ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-white text-gray-700'}`}
                    >
                      Next
                    </button>
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
