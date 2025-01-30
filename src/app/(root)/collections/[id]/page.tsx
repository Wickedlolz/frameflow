import { Suspense } from 'react';
import {
    getCollectionById,
    getCollectionPhotosById,
} from '@/actions/image.action';

import { Skeleton } from '@/components/ui/skeleton';
import CollectionHeader from '@/components/collections/CollectionHeader';
import CollectionPhotos from '@/components/collections/CollectionPhotos';

type Params = Promise<{ id: string }>;

//TODO: add title to metadata

interface CollectionPageProps {
    params: Params;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { id } = await params;
    const [collection, initialPhotos] = await Promise.all([
        getCollectionById(id),
        getCollectionPhotosById(id),
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12">
            <div className="container mx-auto px-4">
                <Suspense
                    fallback={
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                    }
                >
                    <CollectionHeader collection={collection} />
                </Suspense>

                <Suspense
                    fallback={
                        <Skeleton className="h-[600px] w-full rounded-xl" />
                    }
                >
                    <CollectionPhotos id={id} initialPhotos={initialPhotos} />
                </Suspense>
            </div>
        </div>
    );
}
