import { Metadata } from 'next';
import Link from 'next/link';

import LoginForm from '@/components/forms/LoginForm';
import ShowMessage from '@/components/ShowMessage';

export const metadata: Metadata = {
    title: 'Login | FrameFlow - Explore images in a seamless flow.',
    description: 'Sign in to your FrameFlow account.',
};

type SearchParams = Promise<{ message?: string }>;

interface LoginPageProps {
    searchParams: SearchParams;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { message } = await searchParams;

    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-xl flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Welcome Back to FrameFlow
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Sign in to your account to continue
                    </p>
                </div>

                <LoginForm />

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                    {message && (
                        <div className="text-foreground border-l-2 border-l-slate-600 px-4">
                            {message}
                        </div>
                    )}
                </div>
            </div>
            {message && <ShowMessage message={message} />}
        </section>
    );
}
