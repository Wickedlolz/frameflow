'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ImageCard } from '@/components/ImageCard';
import { getCollectionPhotosById } from '@/actions/image.action';
import { IImage } from '@/interfaces/image';

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

    const allPhotos = data?.pages.flat() ?? [];

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {allPhotos.map((photo, index) => (
                <motion.div
                    key={`${photo.id}-${index}`}
                    className="group relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                    }}
                >
                    <ImageCard image={photo} />
                </motion.div>
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
