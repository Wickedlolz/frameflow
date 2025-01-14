'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface HeroProps {
    onSearch: (query: string) => void;
    onCategorySelect: (category: string) => void;
}

export default function Hero({ onSearch, onCategorySelect }: HeroProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
        onSearch(searchQuery);
    };

    return (
        <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20">
            <div className="container mx-auto text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Discover Stunning Images with FrameFlow
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Explore a world of breathtaking visuals from Unsplash. Find
                    inspiration, curate your favorites, and elevate your
                    projects.
                </p>
                <form
                    onSubmit={handleSearch}
                    className="flex justify-center items-center space-x-2 max-w-2xl mx-auto"
                >
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Search for images..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-lg placeholder:text-white"
                        />
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                            size={24}
                        />
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        className="rounded-full bg-white text-purple-600 hover:bg-gray-200 px-8"
                    >
                        Search
                    </Button>
                </form>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    {['Popular', 'Nature', 'Architecture', 'Travel'].map(
                        (category) => (
                            <Button
                                key={category}
                                variant="outline"
                                className="rounded-full border-white text-gray-500 hover:bg-white hover:text-purple-600"
                                onClick={() =>
                                    onCategorySelect(category.toLowerCase())
                                }
                            >
                                {category}
                            </Button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
