'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Grid, Columns } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ICollection {
    id: string;
    title: string;
    description: string | null;
    total_photos: number;
    user: {
        name: string;
        username: string;
    };
    cover_photo: {
        urls: {
            regular: string;
        };
    };
}

type LayoutStyle = 'grid' | 'masonry';

export default function CollectionsPage() {
    const [collections, setCollections] = useState<ICollection[]>([]);
    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState<LayoutStyle>('grid');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const fetchCollections = async (resetCollections = false) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.unsplash.com/collections?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&page=${page}&per_page=12`
            );
            const data = await response.json();

            if (resetCollections) {
                setCollections(data);
            } else {
                setCollections((prev) => [...prev, ...data]);
            }

            setHasMore(data.length === 12);
        } catch (error) {
            console.error('Error fetching collections:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections(true);
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/collections?client_id=${
                    process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
                }&query=${encodeURIComponent(searchInput)}&page=1&per_page=12`
            );
            const data = await response.json();
            setCollections(data.results);
            setHasMore(data.results.length === 12);
            setPage(1);
        } catch (error) {
            console.error('Error searching collections:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
        fetchCollections();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Discover Amazing Collections
                    </h1>
                    <p className="text-lg text-white/90 mb-8">
                        Explore curated collections of high-quality photos from
                        talented creators
                    </p>
                    <form
                        onSubmit={handleSearch}
                        className="flex gap-2 max-w-2xl mx-auto"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search collections..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="pl-10 h-10 bg-white/95 border-0 ring-2 ring-white/20 focus:ring-white"
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="bg-white text-purple-600 hover:bg-white/90"
                        >
                            Search
                        </Button>
                    </form>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-end mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                {layout === 'grid' ? (
                                    <Grid className="h-4 w-4 mr-2" />
                                ) : (
                                    <Columns className="h-4 w-4 mr-2" />
                                )}
                                Layout
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setLayout('grid')}>
                                <Grid className="h-4 w-4 mr-2" /> Grid
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setLayout('masonry')}
                            >
                                <Columns className="h-4 w-4 mr-2" /> Masonry
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {loading && collections.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(12)].map((_, i) => (
                            <Skeleton key={i} className="h-64 rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div
                        className={`grid gap-6 ${
                            layout === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        }`}
                    >
                        {collections.map((collection) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link href={`/collection/${collection.id}`}>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="relative h-48">
                                            <Image
                                                src={
                                                    collection.cover_photo.urls
                                                        .regular
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
                                                    {collection.total_photos}{' '}
                                                    photos
                                                </span>
                                                <span>
                                                    by {collection.user.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {hasMore && (
                    <div className="mt-8 flex justify-center">
                        <Button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
                        >
                            {loading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                )}

                {loading && collections.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
