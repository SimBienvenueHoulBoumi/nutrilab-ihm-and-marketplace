import Link from 'next/link'
import React from 'react'

function Login() {
    return (
        <div className="h-[80vh] flex items-center justify-center px-4 py-auto sm:px-6 lg:px-8">
            <div className="w-full space-y-8">
                <div className="bg-white m-auto w-4/12 shadow-md rounded-md p-6">
                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                        access to your account
                    </h2>

                    <form className="space-y-3" method="POST">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                            <input name="email" type="email" autoComplete="email@mail.com" required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                        </label>

                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                            <input name="password" type="password" autoComplete='*******' required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                        </label>

                        <button type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                            Login
                        </button>
                        <div>
                            <p className="text-center text-gray-500">Don&apos;t have an account? <Link href="/register" className="text-[#20847D]">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
