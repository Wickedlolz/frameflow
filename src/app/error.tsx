'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.2,
                        type: 'spring',
                        stiffness: 200,
                        damping: 10,
                    }}
                    className="inline-block mb-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-lg"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-full p-6">
                            <AlertTriangle size={64} className="text-red-500" />
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Oops! Something went wrong
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    We&apos;re sorry, but it seems like we&apos;ve encountered
                    an error.
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
                    {error.message}
                </p>

                <div className="space-y-4">
                    <Button
                        onClick={reset}
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                        Try again
                    </Button>

                    <div>
                        <Link
                            href="/"
                            className="text-blue-500 hover:underline"
                        >
                            Return to home page
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
