'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ExploreHero({ initialQuery = '' }) {
    const [searchInput, setSearchInput] = useState(initialQuery);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/explore?query=${encodeURIComponent(searchInput)}`);
    };

    return (
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
                            className="pl-10 h-10 bg-white/95 dark:text-black border-0 ring-2 ring-white/20 focus:ring-white"
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
    );
}
