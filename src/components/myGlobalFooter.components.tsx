import Link from 'next/link'
import React from 'react'

export default function MyGlobalFooter() {
    return (<footer className="mx-auto w-full relative text-center text-white">
        <div className="px-3 py-4 md:py-3 xl:pt-5 xl:pb-3">
            <h2 className="font-bold text-3xl xl:text-4xl leading-snug">
                Ready to get your productivity back?<br />Start your free trial today.
            </h2>
            <Link
                className="mt-2 px-4 py-3 text-black text-lg font-medium leading-tight inline-block rounded-md shadow-xl border border-transparent bg-green-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500"
                href="/register">Get started</Link>
            <div className="mt-4 xl:mt-5">
                <nav className="flex flex-wrap justify-center text-lg font-medium">
                    <div className="px-5 py-2"><a href="#">Contact</a></div>
                    <div className="px-5 py-2"><a href="#">Pricing</a></div>
                    <div className="px-5 py-2"><a href="#">Privacy</a></div>
                    <div className="px-5 py-2"><a href="#">Terms</a></div>
                    <div className="px-5 py-2"><a href="#">Twitter</a></div>
                </nav>
                <p className="mt-2 text-base">© 2023 XYZ, LLC</p>
            </div>
        </div>
    </footer>)
}
