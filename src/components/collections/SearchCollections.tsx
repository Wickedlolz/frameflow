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
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-2 max-w-2xl mx-auto mb-8"
        >
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    name="search"
                    type="search"
                    placeholder="Search collections..."
                    className="pl-10 pr-4 py-3 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-lg w-full placeholder:text-white"
                />
            </div>
            <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto rounded-full bg-white text-purple-600 hover:bg-gray-200 px-8"
            >
                Search
            </Button>
        </form>
    );
}
