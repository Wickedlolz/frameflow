import { Metadata } from 'next';
import { Suspense } from 'react';
import { getImageById } from '@/actions/image.action';
import { isImageLiked } from '@/actions/liked-images.action';

import ImageDetails from '@/components/image/ImageDetails';
import RelatedCollections from '@/components/image/RelatedCollections';
import UserPhotos from '@/components/image/UserPhotos';
import { Skeleton } from '@/components/ui/skeleton';

type Params = Promise<{ id: string }>;

interface ImagePageProps {
    params: Params;
}

export async function generateMetadata({
    params,
}: ImagePageProps): Promise<Metadata> {
    const { id } = await params;
    const image = await getImageById(id);
    return {
        title: `${image.alt_description} | FrameFlowX - Explore images in a seamless flow.`,
    };
}

export default async function ImagePage({ params }: ImagePageProps) {
    const { id } = await params;
    const [image, isLiked] = await Promise.all([
        getImageById(id),
        isImageLiked(id),
    ]);

    return (
        <section className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12">
            <div className="container mx-auto px-4">
                <Suspense
                    fallback={
                        <Skeleton className="h-[600px] w-full rounded-xl" />
                    }
                >
                    <ImageDetails image={image} initialLikedState={isLiked} />
                </Suspense>
                {image.related_collections?.results.length > 0 && (
                    <Suspense
                        fallback={
                            <Skeleton className="h-48 w-full rounded-xl" />
                        }
                    >
                        <RelatedCollections
                            collections={image.related_collections.results}
                        />
                    </Suspense>
                )}
                <Suspense
                    fallback={<Skeleton className="h-48 w-full rounded-xl" />}
                >
                    <UserPhotos
                        username={image.user.username}
                        name={image.user.name}
                    />
                </Suspense>
            </div>
        </section>
    );
}
