'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IImage } from '@/interfaces/image';

import { Skeleton } from '@/components/ui/skeleton';
import { ImageCard } from './ImageCard';

interface ImageGridProps {
    searchQuery: string;
}

export default function ImageGrid({ searchQuery }: ImageGridProps) {
    const [images, setImages] = useState<IImage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchImages(searchQuery);
    }, [searchQuery]);

    const fetchImages = async (query: string) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            );
            const data = await response.json();
            console.log(data.results);
            setImages(data.results);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-12 bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    Discover Amazing Images
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(12)].map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full h-64 rounded-lg"
                            />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {images.map((image, index) => (
                            <motion.div
                                key={image.id}
                                className="group relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <ImageCard image={image} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
