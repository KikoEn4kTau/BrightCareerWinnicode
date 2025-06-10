import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    user_type: 'pekerja' | 'perusahaan';
    // Fields for pekerja
    phone?: string;
    skills?: string;
    // Fields for perusahaan
    company_name?: string;
    company_email?: string;
    company_phone?: string;
    business_field?: string;
    company_address?: string;
};

export default function Register() {
    const [userType, setUserType] = useState<'pekerja' | 'perusahaan'>('pekerja');

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_type: userType,
        phone: '',
        skills: '',
        company_name: '',
        company_email: '',
        company_phone: '',
        business_field: '',
        company_address: '',
    });

    const handleUserTypeChange = (type: 'pekerja' | 'perusahaan') => {
        setUserType(type);
        setData('user_type', type);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Buat Akun" description="Isi Data Berikut Untuk Membuat Akun">
            <Head title="Register" />
            <div className="w-full flex flex-col items-center px-4 
                    mt-8 sm:mt-12 md:ml-[150px]  md:mt-[0px]"> 
                {/* Header dengan toggle buttons - Responsive */}
                <div className="flex flex-col items-center justify-center w-full max-w-[542px] min-h-[116px] bg-gray-500 rounded-lg
                        shadow-lg mx-auto mb-6 p-4 relative ">
                    <div className="text-white font-inter font-medium mb-4 text-center text-sm sm:text-base">
                        BUAT AKUN SEBAGAI
                    </div>
                    
                    {/* Toggle Buttons - Responsive */}
                    <div className="flex bg-gray-700 rounded-lg p-1 w-full max-w-xs">
                        <button
                            type="button"
                            onClick={() => handleUserTypeChange('pekerja')}
                            className={`flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-md font-inter font-medium transition-all duration-200 text-xs sm:text-sm ${
                                userType === 'pekerja'
                                    ? 'bg-white text-gray-700 shadow-md'
                                    : 'text-white hover:bg-gray-600'
                            }`}
                        >
                            PEKERJA
                        </button>
                        <button
                            type="button"
                            onClick={() => handleUserTypeChange('perusahaan')}
                            className={`flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-md font-inter font-medium transition-all duration-200 text-xs sm:text-sm ${
                                userType === 'perusahaan'
                                    ? 'bg-white text-gray-700 shadow-md'
                                    : 'text-white hover:bg-gray-600'
                            }`}
                        >
                            PERUSAHAAN
                        </button>
                    </div>
                </div>

                {/* Form - Responsive */}
                <form className="flex flex-col gap-4 sm:gap-6 w-full max-w-md mx-auto px-4 sm:px-6" onSubmit={submit}>
                    <div className="grid gap-3 sm:gap-4">
                        {/* Common Fields */}
                        {userType === 'pekerja' && (
                            <>
                                <div className="grid gap-2">
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Nama Lengkap"
                                        className="w-full"
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>

                                <div className="grid gap-2">
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                        className="w-full"
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>

                                <div className="grid gap-2">
                                    <Input
                                        id="phone"
                                        type="tel"
                                        tabIndex={3}
                                        autoComplete="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        disabled={processing}
                                        placeholder="Nomor Telepon"
                                        className="w-full"
                                    />
                                    <InputError message={errors.phone} className="mt-1" />
                                </div>

                                <div className="grid gap-2">
                                    <Input
                                        id="skills"
                                        type="text"
                                        tabIndex={4}
                                        value={data.skills}
                                        onChange={(e) => setData('skills', e.target.value)}
                                        disabled={processing}
                                        placeholder="Keahlian (contoh: Web Developer, Designer)"
                                        className="w-full"
                                    />
                                    <InputError message={errors.skills} className="mt-1" />
                                </div>
                            </>
                        )}

                        {userType === 'perusahaan' && (
                            <>
                                <div className="grid gap-2">
                                    <Input
                                        id="company_name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Nama Perusahaan"
                                        className="w-full"
                                    />
                                    <InputError message={errors.company_name} className="mt-1" />
                                </div>

                                <div className="grid gap-2">
                                    <Input
                                        id="company_email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.company_email}
                                        onChange={(e) => setData('company_email', e.target.value)}
                                        disabled={processing}
                                        placeholder="Email Perusahaan"
                                        className="w-full"
                                    />
                                    <InputError message={errors.company_email} className="mt-1" />
                                </div>

                                <div className="grid gap-2">
                                    <Input
                                        id="company_phone"
                                        type="tel"
                                        tabIndex={3}
                                        autoComplete="tel"
                                        value={data.company_phone}
                                        onChange={(e) => setData('company_phone', e.target.value)}
                                        disabled={processing}
                                        placeholder="Nomor Telepon Perusahaan"
                                        className="w-full"
                                    />
                                    <InputError message={errors.company_phone} className="mt-1" />
                                </div>

                                <div className="grid gap-2">
                                    <select
                                        id="business_field"
                                        tabIndex={4}
                                        value={data.business_field}
                                        onChange={(e) => setData('business_field', e.target.value)}
                                        disabled={processing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
                                        focus:ring-blue-500 bg-white text-muted-foreground border-input rounded-md border outline-none 
                                        file:border-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] 
                                        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                    >
                                        <option value="" >Pilih Bidang Usaha</option>
                                        <option value="teknologi">Teknologi</option>
                                        <option value="manufaktur">Manufaktur</option>
                                        <option value="perdagangan">Perdagangan</option>
                                        <option value="jasa">Jasa</option>
                                        <option value="lainnya">Lainnya</option>
                                    </select>
                                    <InputError message={errors.business_field} className="mt-1" />
                                </div>
                            </>
                        )}

                        {/* Password Fields - Same for both types */}
                        <div className="grid gap-2">
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={userType === 'pekerja' ? 5 : 8}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                                className="w-full"
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div className="grid gap-2">
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={userType === 'pekerja' ? 6 : 9}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Konfirmasi Password"
                                className="w-full"
                            />
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>

                        <Button
                            type="submit"
                            className="text-white mt-2 w-full flex items-center justify-center gap-2"
                            tabIndex={userType === 'pekerja' ? 7 : 10}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Daftar sebagai {userType === 'pekerja' ? 'Pekerja' : 'Perusahaan'} &rarr;
                        </Button>
                    </div>

                    <div className="text-db-foreground text-center text-sm">
                        Sudah Memiliki Akun?{' '}
                        <TextLink href={route('login')} tabIndex={userType === 'pekerja' ? 8 : 11}>
                            Masuk
                        </TextLink>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}