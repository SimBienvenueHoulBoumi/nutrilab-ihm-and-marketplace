import Link from 'next/link'
import React from 'react'

function Register() {

    return (
        <div className="h-[80vh] flex items-center justify-center px-4 py-auto sm:px-6 lg:px-8">
            <div className="w-full space-y-8">
                <div className="bg-white m-auto w-4/12 shadow-md rounded-md p-6">
                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Signin an account
                    </h2>

                    <form className="space-y-3" method="POST">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                            <input name="email" type="email" autoComplete="email@mail.com" required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                        </label>

                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                            <div className="p-1">
                                <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                                <p className="text-xs text-gray-500">Must contain at least one uppercase letter, one lowercase letter</p>
                                <p className="text-xs text-gray-500">Must contain at least one number</p>
                                <p className="text-xs text-gray-500">Must contain at least one special character</p>
                            </div>
                            <input name="password" type="password" autoComplete='*******' required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                        </label>

                        <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                            <input name="password2" type="password" autoComplete='*******' required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                        </label>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                            register
                        </button>
                        <div className="text-center text-gray-500">
                            Already have an account?
                            <Link href="/login">
                                <div className='hover:underline hover:text-[#20847D]'>Login</div>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
