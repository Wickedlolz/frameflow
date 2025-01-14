'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Download,
    Heart,
    ArrowLeft,
    Calendar,
    ThumbsUp,
    Eye,
    Instagram,
    Camera,
} from 'lucide-react';
import { IImagePreview } from '@/interfaces/image';

export default function ImagePreviewPage() {
    const { id } = useParams();
    const router = useRouter();
    const [image, setImage] = useState<IImagePreview | null>(null);
    const [userPhotos, setUserPhotos] = useState<Partial<IImagePreview>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImageAndUserPhotos = async () => {
            try {
                const [imageResponse, userPhotosResponse] = await Promise.all([
                    fetch(
                        `https://api.unsplash.com/photos/${id}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
                    ),
                    fetch(
                        `https://api.unsplash.com/users/${image?.user.username}/photos?per_page=6&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
                    ),
                ]);
                const imageData = await imageResponse.json();
                const userPhotosData = await userPhotosResponse.json();
                console.log('user photos:', userPhotosData);
                setImage(imageData);
                setUserPhotos(userPhotosData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchImageAndUserPhotos();
        }
    }, [id, image?.user.username]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
                <Skeleton className="h-[600px] w-[800px] rounded-xl" />
            </div>
        );
    }

    if (!image) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    Image not found
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
                        Back to search
                    </Button>

                    <Card className="overflow-hidden rounded-xl shadow-2xl mb-12">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="relative aspect-square md:aspect-auto">
                                    <Image
                                        src={image.urls.regular}
                                        alt={image.alt_description || 'Image'}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                                        {image.alt_description ||
                                            'Untitled Image'}
                                    </h1>

                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                            Photographer
                                        </h2>
                                        <div className="flex items-center">
                                            <Image
                                                src={
                                                    image.user.profile_image
                                                        .medium
                                                }
                                                alt={image.user.name}
                                                width={60}
                                                height={60}
                                                className="rounded-full mr-4"
                                            />
                                            <div>
                                                <Link
                                                    href={image.user.links.html}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                >
                                                    <h3 className="text-lg font-semibold">
                                                        {image.user.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    @{image.user.username}
                                                </p>
                                                <div className="flex items-center mt-2">
                                                    <Camera className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {
                                                            image.user
                                                                .total_photos
                                                        }{' '}
                                                        photos
                                                    </span>
                                                    {image.user
                                                        .instagram_username && (
                                                        <Link
                                                            href={`https://www.instagram.com/${image.user.instagram_username}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="ml-4 text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                                                        >
                                                            <Instagram className="h-4 w-4" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {image.description && (
                                        <div className="mb-8">
                                            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                                Description
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {image.description}
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center">
                                            <ThumbsUp className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-gray-800 dark:text-white">
                                                {image.likes} Likes
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Eye className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-gray-800 dark:text-white">
                                                {image.views} Views
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Download className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-gray-800 dark:text-white">
                                                {image.downloads} Downloads
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-gray-800 dark:text-white">
                                                {new Date(
                                                    image.created_at
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <Button
                                            size="lg"
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            <Heart className="h-5 w-5 mr-2" />
                                            Like
                                        </Button>
                                        <Button
                                            size="lg"
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Download className="h-5 w-5 mr-2" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {image.related_collections &&
                        image.related_collections.results.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                                    Related Collections
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {image.related_collections.results
                                        .slice(0, 3)
                                        .map((collection) => (
                                            <Link
                                                href={`/collections/${collection.id}`}
                                                key={collection.id}
                                            >
                                                <Card className="overflow-hidden">
                                                    <CardContent className="p-4">
                                                        <div className="relative aspect-video mb-4">
                                                            <Image
                                                                src={
                                                                    collection
                                                                        .cover_photo
                                                                        .urls
                                                                        .small
                                                                }
                                                                alt={
                                                                    collection.title
                                                                }
                                                                fill
                                                                className="object-cover rounded-lg"
                                                            />
                                                        </div>
                                                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                                                            {collection.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {
                                                                collection.total_photos
                                                            }{' '}
                                                            photos
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        )}

                    {userPhotos.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                                More from {image.user.name}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {userPhotos.map((photo) => (
                                    <Link
                                        key={photo.id}
                                        href={`/image/${photo.id}`}
                                    >
                                        <div className="relative aspect-square overflow-hidden rounded-lg">
                                            <Image
                                                src={photo.urls!.small}
                                                alt={
                                                    photo.alt_description ||
                                                    'User photo'
                                                }
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
