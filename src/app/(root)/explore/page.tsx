import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchPhotos } from '@/actions/image.action';

import ExploreHero from '@/components/explore/ExploreHero';
import ExploreFilters from '@/components/explore/ExploreFilters';
import ExploreImageGrid from '@/components/explore/ExploreImageGrid';

type SearchParams = Promise<{
    query?: string;
    orientation?: string;
    color?: string;
    orderBy?: string;
    page?: number;
}>;

export const metadata: Metadata = {
    title: 'Explore | FrameFlow - Explore images in a seamless flow.',
};

export default async function ExplorePage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const params = await searchParams;

    const query = params.query as string | undefined;
    const orientation = params.orientation as string | undefined;
    const color = params.color as string | undefined;
    const orderBy = params.orderBy as string | undefined;

    const initialPhotos = await fetchPhotos({
        query,
        orientation,
        color,
        orderBy,
        page: 1,
    });

    return (
        <section className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <ExploreHero initialQuery={query} />
            <ExploreFilters
                initialOrientation={orientation}
                initialColor={color}
                initialOrderBy={orderBy}
            />
            <Suspense fallback={<div>Loading...</div>}>
                <ExploreImageGrid
                    initialPhotos={initialPhotos}
                    query={query}
                    orientation={orientation}
                    color={color}
                    orderBy={orderBy}
                />
            </Suspense>
        </section>
    );
}
