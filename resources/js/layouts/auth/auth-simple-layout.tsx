import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-white flex min-h-screen flex items-start  justify-start gap-6 p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-8">
                    <div className="hidden lg:block lg:fixed lg:right-0 lg:top-0 lg:w-1/2 lg:h-screen xl:w-[620px]">
                        <img src="Auth.svg" alt="Auth Image"></img>
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex h-135px w-55px items-start">
                                <img src="bright.svg" alt="Logo Perusahaan"></img>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-start">
                            <h1 className="text-db text-4xl font-inter transform translate-x-[50px] font-bold">{title}</h1>
                            <p className="text-db text-sm transform translate-x-[50px] font-semibold">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
