import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Buat Akun" description="Isi Data Berikut Untuk Membuat Akun">
            <Head title="Register" />
            <form className="flex flex-col gap-6 w-full max-w-md mx-auto px-4 sm:px-6" onSubmit={submit}>
                <div className="grid gap-4 sm:gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Nama Lengkap
                        </Label>
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
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email
                        </Label>
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
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
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
                        <Label htmlFor="password_confirmation" className="text-sm font-medium">
                            Konfirmasi Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
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
                        tabIndex={5} 
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Daftar &rarr; 
                    </Button>
                </div>

                <div className="text-db-foreground text-center text-sm">
                    Sudah Memiliki Akun?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Masuk
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}