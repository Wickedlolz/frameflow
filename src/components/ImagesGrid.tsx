'use client';

import { motion } from 'framer-motion';
import { IImage } from '@/interfaces/image';

import { ImageCard } from './ImageCard';

interface ImageGridProps {
    images: IImage[];
}

export default function ImageGrid({ images }: ImageGridProps) {
    return (
        <section className="py-12 bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    Discover Amazing Images
                </h2>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {images &&
                        images.length > 0 &&
                        images.map((image, index) => (
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
            </div>
        </section>
    );
}
