import { Metadata } from 'next';
import Link from 'next/link';
import SignUpForm from '@/components/forms/SignUpForm';

export const metadata: Metadata = {
    title: 'Sign Up | FrameFlow - Explore images in a seamless flow.',
    description: 'Create an account to start exploring amazing images.',
};

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Join FrameFlow
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Create an account to start exploring
                    </p>
                </div>

                <SignUpForm />

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
