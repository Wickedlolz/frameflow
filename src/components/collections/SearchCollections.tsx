'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchCollections() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('search') as string;
        router.push(`?q=${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    name="search"
                    type="search"
                    placeholder="Search collections..."
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
    );
}
