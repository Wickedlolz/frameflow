'use client';
import { useState } from 'react';

import Hero from '@/components/Hero';
import ImagesGrid from '@/components/ImagesGrid';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('popular');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleCategorySelect = (category: string) => {
        setSearchQuery(category);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Hero
                onSearch={handleSearch}
                onCategorySelect={handleCategorySelect}
            />
            <ImagesGrid searchQuery={searchQuery} />
        </section>
    );
}
