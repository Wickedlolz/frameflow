'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { IImage } from '@/interfaces/image';
import { ImageCard } from './ImageCard';

interface ImageGridProps {
    images: IImage[];
}

export default function ImageGrid({ images }: ImageGridProps) {
    const [columns, setColumns] = useState<number>(4);

    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 640) {
                setColumns(1);
            } else if (window.innerWidth < 768) {
                setColumns(2);
            } else if (window.innerWidth < 1024) {
                setColumns(3);
            } else {
                setColumns(4);
            }
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const distributeImages = () => {
        const cols: IImage[][] = Array.from({ length: columns }, () => []);
        images.forEach((image, index) => {
            cols[index % columns].push(image);
        });
        return cols;
    };

    return (
        <section className="py-12 bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    Discover Amazing Images
                </h2>

                <motion.div
                    className="flex flex-wrap -mx-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {distributeImages().map((column, columnIndex) => (
                        <div
                            key={columnIndex}
                            className={`w-full px-2 ${
                                columns === 1
                                    ? 'sm:w-full'
                                    : columns === 2
                                    ? 'sm:w-1/2'
                                    : columns === 3
                                    ? 'sm:w-1/2 md:w-1/3'
                                    : 'sm:w-1/2 md:w-1/3 lg:w-1/4'
                            }`}
                        >
                            {column.map((image, imageIndex) => (
                                <motion.div
                                    key={`${image.id}-${imageIndex}`}
                                    className="mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: imageIndex * 0.1,
                                    }}
                                >
                                    <ImageCard image={image} />
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
