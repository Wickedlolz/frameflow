import { Suspense } from 'react';
import { fetchCollections } from '@/actions/image.action';
import { Skeleton } from '@/components/ui/skeleton';
import SearchCollections from '@/components/collections/SearchCollections';
import CollectionsGrid from '@/components/collections/CollectionsGrid';

interface CollectionsPageProps {
    searchParams: { q?: string };
}

export default async function CollectionsPage({
    searchParams,
}: CollectionsPageProps) {
    const initialData = await fetchCollections({
        query: searchParams.q,
        perPage: 12,
    });

    return (
        <section className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Discover Amazing Collections
                    </h1>
                    <p className="text-lg text-white/90 mb-8">
                        Explore curated collections of high-quality photos from
                        talented creators
                    </p>
                    <SearchCollections />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
                    <CollectionsGrid
                        initialData={initialData}
                        searchQuery={searchParams.q}
                    />
                </Suspense>
            </div>
        </section>
    );
}
