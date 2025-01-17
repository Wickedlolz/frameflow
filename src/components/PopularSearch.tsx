'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

const popularSearchTerms = [
    'Nature',
    'City life',
    'Abstract art',
    'Travel',
    'Food photography',
    'Minimalism',
    'Portraits',
    'Technology',
    'Wildlife',
    'Architecture',
];

export default function PopularSearch() {
    const router = useRouter();
    const [currentTerm, setCurrentTerm] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTerm(
                (prevTerm) => (prevTerm + 1) % popularSearchTerms.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handlePopularSearch = (term: string) => {
        router.push(`/explore?query=${encodeURIComponent(term)}`);
    };

    return (
        <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTerm}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button
                            variant="outline"
                            className="rounded-full border-white bg-white/10 text-white hover:bg-white hover:text-purple-600 dark:border-white/80 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white dark:hover:text-purple-600 backdrop-blur-sm transition-all duration-300"
                            onClick={() =>
                                handlePopularSearch(
                                    popularSearchTerms[currentTerm]
                                )
                            }
                        >
                            {popularSearchTerms[currentTerm]}
                        </Button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
