import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import type { PageProps } from '../types/page-props'; // sesuaikan path-nya

export default function Header() {
      const { auth } = usePage<PageProps>().props;

    return (
        <header className="bg-white shadow-md w-full h-16 md:h-[70px] fixed top-0 left-0 right-0 z-50">
            <nav className="flex h-full w-full items-center justify-between px-4 md:px-6 lg:px-8">
                {/* Logo */}
                <Link className="flex-shrink-0" href="/">
                    <img src="bright.svg" alt="Logo Perusahaan" className="h-8 md:h-10" />
                </Link>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center space-x-6">
                    <Link className="text-base text-db font-semibold hover:text-lb/90" href={route('profiles')}>
                        Profil Saya
                    </Link>
                    <Link className="text-base text-db font-semibold hover:text-lb/90" href="/profil">
                        Untuk Perusahaan
                    </Link>
                    <Link className="text-base text-db font-semibold hover:text-lb/90" href={route('search')}>
                        Cari Pekerjaan
                    </Link>
                    <Link className="text-base text-db font-semibold hover:text-lb/90" href={route('community')}>
                        Komunitas
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    {auth.user ? (
                        <Link
                            href={route('settings')}
                            className="rounded-xl border border-2 border-db px-3 py-1.5 md:px-5 text-sm md:text-base text-db font-semibold hover:bg-db hover:text-white transition-colors duration-200"
                        >
                            Profil
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-xl border border-2 border-db px-3 py-1.5 md:px-5 text-sm md:text-base text-db font-semibold hover:bg-db hover:text-white transition-colors duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-xl border border-2 border-db px-3 py-1.5 md:px-5 text-sm md:text-base text-db font-semibold hover:bg-db hover:text-white transition-colors duration-200"
                            >
                                Daftar
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
