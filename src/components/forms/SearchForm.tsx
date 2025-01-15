'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchForm() {
    const [query, setQuery] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/explore?query=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center space-x-2 max-w-2xl mx-auto"
        >
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search for images..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-lg w-full placeholder:text-white"
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
    );
}
