'use client';

import Image from 'next/image';
import Link from 'next/link';
import { fetchPhotos } from '@/actions/image.action';
import { motion } from 'framer-motion';
import { IImage } from '@/interfaces/image';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ExploreImageGridProps {
    initialPhotos: IImage[];
    query?: string;
    orientation?: string;
    color?: string;
    orderBy?: string;
}

export default function ExploreImageGrid({
    initialPhotos,
    query,
    orientation,
    color,
    orderBy = 'latest',
}: ExploreImageGridProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ['photos', query, orientation, color, orderBy],
        queryFn: ({ pageParam = 1 }) =>
            fetchPhotos({
                query,
                orientation,
                color,
                orderBy,
                page: pageParam,
            }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 20 ? allPages.length + 1 : undefined;
        },
        initialData: { pages: [initialPhotos], pageParams: [1] },
        initialPageParam: 1,
    });

    const allPhotos = data?.pages.flat() ?? [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div>Error fetching photos</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px]">
                {allPhotos.map((photo, index) => (
                    <motion.div
                        key={`${photo.id}-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`${
                            photo.height > photo.width
                                ? 'row-span-2'
                                : 'row-span-1'
                        }`}
                    >
                        <Link href={`/image/${photo.id}`}>
                            <div className="relative  w-full h-full rounded-lg overflow-hidden group">
                                <Image
                                    src={
                                        photo.urls.regular || '/placeholder.svg'
                                    }
                                    alt={
                                        photo.alt_description ||
                                        'Unsplash photo'
                                    }
                                    fill
                                    className={`object-cover transform group-hover:scale-105 transition-transform duration-300`}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <p className="font-medium truncate">
                                            {photo.user.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {hasNextPage && (
                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}

            {isFetchingNextPage && (
                <div className="mt-8 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            )}
        </div>
    );
}
