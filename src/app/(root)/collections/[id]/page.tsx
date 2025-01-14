/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, User, Image as ImageIcon } from 'lucide-react';
import { ImageCard } from '@/components/ImageCard';

export default function CollectionPage() {
    const { id } = useParams();
    const router = useRouter();
    const [collection, setCollection] = useState<any>(null);
    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollectionAndPhotos = async () => {
            try {
                const [collectionResponse, photosResponse] = await Promise.all([
                    fetch(
                        `https://api.unsplash.com/collections/${id}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
                    ),
                    fetch(
                        `https://api.unsplash.com/collections/${id}/photos?per_page=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
                    ),
                ]);
                const collectionData = await collectionResponse.json();
                const photosData = await photosResponse.json();
                setCollection(collectionData);
                setPhotos(photosData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCollectionAndPhotos();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
                <Skeleton className="h-[600px] w-[800px] rounded-xl" />
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    Collection not found
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button
                        variant="ghost"
                        className="mb-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    <Card className="mb-12">
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative aspect-video">
                                    <Image
                                        src={
                                            collection.cover_photo.urls.regular
                                        }
                                        alt={collection.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                                        {collection.title}
                                    </h1>
                                    {collection.description && (
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                                            {collection.description}
                                        </p>
                                    )}
                                    <div className="flex items-center mb-6">
                                        <Image
                                            src={
                                                collection.user.profile_image
                                                    .medium
                                            }
                                            alt={collection.user.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full mr-4"
                                        />
                                        <div>
                                            <Link
                                                href={
                                                    collection.user.links.html
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                <span className="font-semibold">
                                                    {collection.user.name}
                                                </span>
                                            </Link>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                @{collection.user.username}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <ImageIcon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-gray-800 dark:text-white">
                                                {collection.total_photos} Photos
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <User className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-gray-800 dark:text-white">
                                                {collection.total_photos}{' '}
                                                Contributors
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {photos.map((photo: any, index: number) => (
                            <motion.div
                                key={photo.id}
                                className="group relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <ImageCard image={photo} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
