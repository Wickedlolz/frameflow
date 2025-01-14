'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, Columns, SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IImage } from '@/interfaces/image';

interface FilterState {
    query: string;
    orientation: string;
    color: string;
    orderBy: string;
}

type LayoutStyle = 'masonry' | 'grid';

export default function ExplorePage() {
    const [photos, setPhotos] = useState<IImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState<LayoutStyle>('masonry');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const [filters, setFilters] = useState<FilterState>({
        query: '',
        orientation: '',
        color: '',
        orderBy: 'latest',
    });

    const fetchPhotos = async (resetPhotos = true) => {
        setLoading(true);
        try {
            let url = '';
            const params = new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
                per_page: '20',
                page: page.toString(),
            });

            if (filters.orientation && filters.orientation !== 'any') {
                params.append('orientation', filters.orientation);
            }

            if (filters.color && filters.color !== 'any') {
                params.append('color', filters.color);
            }

            if (filters.orderBy) {
                params.append('order_by', filters.orderBy);
            }

            if (filters.query) {
                url = `https://api.unsplash.com/search/photos?${params.toString()}&query=${encodeURIComponent(
                    filters.query
                )}`;
            } else {
                url = `https://api.unsplash.com/photos?${params.toString()}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            const newPhotos = filters.query ? data.results : data;

            if (resetPhotos) {
                setPhotos(newPhotos);
            } else {
                setPhotos((prev) => [...prev, ...newPhotos]);
            }

            setHasMore(newPhotos.length === 20);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos(true);
    }, [filters.orientation, filters.color, filters.orderBy]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setFilters((prev) => ({ ...prev, query: searchInput }));
        setPage(1);
        await fetchPhotos(true);
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
        fetchPhotos(false);
    };

    const updateFilters = (key: keyof FilterState, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Explore Amazing Photos
                    </h1>
                    <p className="text-lg text-white/90 mb-8">
                        Discover millions of free high-resolution photos from
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
                                placeholder="Search high-resolution photos"
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

            {/* Filters Bar */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                        <SheetDescription>
                                            Refine your photo search
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="mt-6 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Orientation
                                            </label>
                                            <Select
                                                value={filters.orientation}
                                                onValueChange={(value) =>
                                                    updateFilters(
                                                        'orientation',
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Any orientation" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">
                                                        Any orientation
                                                    </SelectItem>
                                                    <SelectItem value="landscape">
                                                        Landscape
                                                    </SelectItem>
                                                    <SelectItem value="portrait">
                                                        Portrait
                                                    </SelectItem>
                                                    <SelectItem value="squarish">
                                                        Square
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Color
                                            </label>
                                            <Select
                                                value={filters.color}
                                                onValueChange={(value) =>
                                                    updateFilters(
                                                        'color',
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Any color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">
                                                        Any color
                                                    </SelectItem>
                                                    <SelectItem value="black_and_white">
                                                        Black & White
                                                    </SelectItem>
                                                    <SelectItem value="black">
                                                        Black
                                                    </SelectItem>
                                                    <SelectItem value="white">
                                                        White
                                                    </SelectItem>
                                                    <SelectItem value="yellow">
                                                        Yellow
                                                    </SelectItem>
                                                    <SelectItem value="orange">
                                                        Orange
                                                    </SelectItem>
                                                    <SelectItem value="red">
                                                        Red
                                                    </SelectItem>
                                                    <SelectItem value="purple">
                                                        Purple
                                                    </SelectItem>
                                                    <SelectItem value="magenta">
                                                        Magenta
                                                    </SelectItem>
                                                    <SelectItem value="green">
                                                        Green
                                                    </SelectItem>
                                                    <SelectItem value="teal">
                                                        Teal
                                                    </SelectItem>
                                                    <SelectItem value="blue">
                                                        Blue
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <Select
                                value={filters.orderBy}
                                onValueChange={(value) =>
                                    updateFilters('orderBy', value)
                                }
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">
                                        Latest
                                    </SelectItem>
                                    <SelectItem value="relevant">
                                        Relevant
                                    </SelectItem>
                                    <SelectItem value="popular">
                                        Popular
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    {layout === 'masonry' ? (
                                        <Columns className="h-4 w-4" />
                                    ) : (
                                        <Grid className="h-4 w-4" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => setLayout('masonry')}
                                >
                                    <Columns className="h-4 w-4 mr-2" /> Masonry
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setLayout('grid')}
                                >
                                    <Grid className="h-4 w-4 mr-2" /> Grid
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Image Grid */}
            <div className="container mx-auto px-4 py-8">
                {loading && photos.length === 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(12)].map((_, i) => (
                            <Skeleton
                                key={i}
                                className="aspect-[3/4] rounded-lg"
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className={`grid gap-4 ${
                            layout === 'masonry'
                                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px]'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        }`}
                    >
                        {photos.map((photo, index) => (
                            <motion.div
                                key={`${photo.id}-${index}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className={`${
                                    layout === 'masonry'
                                        ? photo.height > photo.width
                                            ? 'row-span-2'
                                            : 'row-span-1'
                                        : 'aspect-square'
                                }`}
                            >
                                <Link href={`/image/${photo.id}`}>
                                    <div
                                        className={`relative ${
                                            layout === 'grid'
                                                ? 'aspect-square w-full'
                                                : 'w-full h-full'
                                        } rounded-lg overflow-hidden group`}
                                    >
                                        <Image
                                            src={photo.urls.regular}
                                            alt={
                                                photo.alt_description ||
                                                'Unsplash photo'
                                            }
                                            fill
                                            className={`object-cover ${
                                                layout === 'grid'
                                                    ? 'aspect-square'
                                                    : ''
                                            } transform group-hover:scale-105 transition-transform duration-300`}
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

                {loading && photos.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
