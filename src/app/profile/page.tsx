"use client"

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import CustomInput from '@/components/myInput.components';
import { IFormValues } from '@/types/formValues.types';
import { getArticles } from '@/services/nutrilab.article.service';
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
    console.log('Form data:', data);
    setTimeout(() => {
      setLoading(false);
      console.log('Form submitted');
    }, 2000);
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
                <CustomInput label="Current Password" name="current_password" type="password" register={register} required />
                <CustomInput label="New Password" name="new_password" type="password" register={register} required />
                <CustomInput label="Confirm Password" name="confirm_password" type="password" register={register} required />
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
                <table className="w-full mt-4">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Area</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {articles.filter(
                      e => e.userId === localUserId
                    ).map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{article.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{article.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{article.area}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
