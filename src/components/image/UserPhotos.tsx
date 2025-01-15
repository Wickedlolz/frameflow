'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { requester } from '@/actions/image.action';
import { IImagePreview } from '@/interfaces/image';

interface UserPhotosProps {
    username: string;
    name: string;
}

export default function UserPhotos({ username, name }: UserPhotosProps) {
    const { data: userPhotos, isLoading } = useQuery({
        queryKey: ['userPhotos', username],
        queryFn: () =>
            requester<IImagePreview[]>(`/users/${username}/photos`, {
                perPage: 6,
            }),
    });

    if (isLoading || !userPhotos?.length) return null;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                More from {name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {userPhotos.map((photo) => (
                    <Link key={photo.id} href={`/image/${photo.id}`}>
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                            <Image
                                src={photo.urls!.small}
                                alt={photo.alt_description || 'User photo'}
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
