'use client';

import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getCollectionPhotosById } from '@/actions/image.action';
import { IImage } from '@/interfaces/image';

import { Button } from '@/components/ui/button';
import { ImageCard } from '@/components/ImageCard';

interface CollectionPhotosProps {
    id: string;
    initialPhotos: IImage[];
}

export default function CollectionPhotos({
    id,
    initialPhotos,
}: CollectionPhotosProps) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['collectionPhotos', id],
            queryFn: ({ pageParam = 1 }) =>
                getCollectionPhotosById(id, pageParam, 30),
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length === 30 ? allPages.length + 1 : undefined;
            },
            initialData: { pages: [initialPhotos], pageParams: [1] },
            initialPageParam: 1,
        });
    const [columns, setColumns] = useState<number>(4);

    const allPhotos = data?.pages.flat() ?? [];

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
        allPhotos.forEach((image, index) => {
            cols[index % columns].push(image);
        });
        return cols;
    };

    return (
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

            {hasNextPage && (
                <div className="col-span-full mt-8 flex justify-center">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </motion.div>
    );
}
