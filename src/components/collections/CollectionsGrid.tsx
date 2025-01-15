'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPaginatedCollections } from '@/actions/image.action';
import { ICollection } from '@/interfaces/collection';

import { Grid, Columns } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CollectionsGridProps {
    initialData: ICollection[];
    searchQuery?: string;
}

type LayoutStyle = 'grid' | 'masonry';

export default function CollectionsGrid({
    initialData,
    searchQuery,
}: CollectionsGridProps) {
    const [layout, setLayout] = useState<LayoutStyle>('grid');

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ['collections', searchQuery],
            queryFn: ({ pageParam = 1 }) =>
                fetchPaginatedCollections(pageParam, searchQuery),
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length === 12 ? allPages.length + 1 : undefined;
            },
            initialData: { pages: [initialData], pageParams: [1] },
            initialPageParam: 1,
        });

    const allCollections =
        data?.pages.reduce<ICollection[]>((acc, page) => {
            const uniqueCollections = page.filter(
                (collection) =>
                    !acc.some(
                        (existingCollection) =>
                            existingCollection.id === collection.id
                    )
            );
            return [...acc, ...uniqueCollections];
        }, []) ?? [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(12)].map((_, i) => (
                    <Skeleton key={i} className="h-64 rounded-lg" />
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-end mb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            {layout === 'grid' ? (
                                <Columns className="h-4 w-4 mr-2" />
                            ) : (
                                <Grid className="h-4 w-4 mr-2" />
                            )}
                            Layout
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setLayout('masonry')}>
                            <Grid className="h-4 w-4 mr-2" /> Grid
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLayout('grid')}>
                            <Columns className="h-4 w-4 mr-2" /> Masonry
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div
                className={`grid gap-6 ${
                    layout === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}
            >
                {allCollections.map((collection) => (
                    <motion.div
                        key={collection.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href={`/collections/${collection.id}`}>
                            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48">
                                    <Image
                                        src={
                                            collection.cover_photo.urls.regular
                                        }
                                        alt={collection.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate">
                                        {collection.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                                        {collection.description ||
                                            'No description available'}
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                        <span>
                                            {collection.total_photos} photos
                                        </span>
                                        <span>by {collection.user.name}</span>
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
        </>
    );
}
