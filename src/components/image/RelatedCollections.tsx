'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { IImagePreview } from '@/interfaces/image';

interface RelatedCollectionsProps {
    collections: IImagePreview['related_collections']['results'];
}

export default function RelatedCollections({
    collections,
}: RelatedCollectionsProps) {
    if (!collections.length) return null;

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Related Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {collections.slice(0, 3).map((collection) => (
                    <Link
                        href={`/collections/${collection.id}`}
                        key={collection.id}
                    >
                        <Card className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="relative aspect-video mb-4">
                                    <Image
                                        src={collection.cover_photo.urls.small}
                                        alt={collection.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                                    {collection.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {collection.total_photos} photos
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
