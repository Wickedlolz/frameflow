'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function JoinCommunity() {
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
                        Join Our Creative Community
                    </h2>
                    <p className="text-xl text-black/80 dark:text-white/80 mb-8 max-w-2xl mx-auto">
                        Discover, share, and create with FrameFlow. Sign up now
                        to start your visual journey!
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-purple-500/90 hover:text-white transition-all duration-300 ease-in-out"
                    >
                        <Link href="/signup">Get Started for Free</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
