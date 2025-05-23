// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Lupa Password" description="Masukkan Email Anda Untuk Melakukan Reset Password">
            <Head title="Forgot password" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2 transform translate-x-[50px]">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex h-[45px] w-[541px] justify-start transform translate-x-[50px]">
                        <Button className="w-full text-white items-center" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset
                        </Button>
                    </div>
                </form>

                <div className="text-muted-foreground space-x-1 text-sm transform translate-x-[280px]">
                    <span>Atau</span>
                    <TextLink href={route('login')}>Masuk</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
