import Link from 'next/link';
import React from 'react';

export default function MyGlobalFooter() {
    return (
        <footer className="w-full bg-[#DFAF2C] text-white">
            <div className="container mx-auto px-6 py-4">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                        Ready to create culinary masterpieces?
                    </h2>
                    <p>Start your free trial today and join our community of food lovers!</p>
                </div>
                <nav className="flex flex-wrap justify-center space-x-3 text-lg font-medium">
                    <Link href="#"><div className="hover:underline">Contact</div></Link>
                    <Link href="#"><div className="hover:underline">Pricing</div></Link>
                    <Link href="#"><div className="hover:underline">Privacy</div></Link>
                    <Link href="#"><div className="hover:underline">Terms</div></Link>
                    <Link href="#"><div className="hover:underline">Twitter</div></Link>
                </nav>
                <div className="text-center text-base">
                    <p>© 2023 XYZ, LLC</p>
                </div>
            </div>
        </footer>
    );
}
