'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IImagePreview } from '@/interfaces/image';
import { downloadImage } from '@/utils/download';
import { toggleLikeImage } from '@/actions/liked-images.action';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Download,
    Heart,
    ArrowLeft,
    Calendar,
    ThumbsUp,
    Eye,
    Instagram,
    Camera,
    ZoomIn,
} from 'lucide-react';
import ImageLightbox from './ImageLightbox';

interface ImageDetailsProps {
    image: IImagePreview;
    initialLikedState?: boolean;
}

export default function ImageDetails({
    image,
    initialLikedState = false,
}: ImageDetailsProps) {
    const router = useRouter();
    const [showLightbox, setShowLightbox] = useState<boolean>(false);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [isLiked, setIsLiked] = useState(initialLikedState);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const filename = `${image.alt_description || 'unsplash-image'}.jpg`;
            await downloadImage(image.links.download_location, filename);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleLike = () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState); // Optimistic update

        startTransition(async () => {
            try {
                const result = await toggleLikeImage(image);
                if (result.liked !== newLikedState) {
                    setIsLiked(result.liked); // Revert if server state differs
                }
                toast.success(
                    result.liked
                        ? `${image.slug} Saved to your collection! 🎉`
                        : `${image.slug} Removed from your collection! 😔`
                );
            } catch (error) {
                console.log(error);
                setIsLiked(!newLikedState); // Revert on error
                toast.error('Please sign in to like images. 🔒');
            }
        });
    };

    return (
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

            <Card className="overflow-hidden rounded-xl shadow-2xl mb-12">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative aspect-square md:aspect-auto group">
                            <Image
                                src={image.urls.regular}
                                alt={image.alt_description || 'Unsplash Image'}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover cursor-zoom-in"
                                onClick={() => setShowLightbox(true)}
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 bg-black/50 text-white md:opacity-0 md:group-hover:opacity-100 md:transition-opacity"
                                onClick={() => setShowLightbox(true)}
                            >
                                <ZoomIn className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="p-8">
                            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                                {image.alt_description || 'Untitled Image'}
                            </h1>

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                    Photographer
                                </h2>
                                <div className="flex items-center">
                                    <Image
                                        src={image.user.profile_image.medium}
                                        alt={image.user.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full mr-4"
                                    />
                                    <div>
                                        <Link
                                            href={`${image.user.links.html}?utm_source=frameflow&utm_medium=referral`}
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
                                                {image.user.total_photos} photos
                                            </span>
                                            {image.user.instagram_username && (
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
                                    onClick={handleLike}
                                    disabled={isPending}
                                    className={cn(
                                        'flex-1 relative group overflow-hidden transition-all duration-300',
                                        isLiked
                                            ? 'bg-pink-600 hover:bg-pink-700'
                                            : 'bg-blue-600 hover:bg-blue-700',
                                        'text-white disabled:opacity-50'
                                    )}
                                >
                                    <Heart
                                        className={cn(
                                            'h-5 w-5 mr-2 transition-transform duration-300',
                                            isLiked && 'fill-current scale-110'
                                        )}
                                    />
                                    {isPending
                                        ? 'Processing...'
                                        : isLiked
                                        ? 'Liked'
                                        : 'Like'}
                                </Button>
                                <Button
                                    size="lg"
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                >
                                    <Download className="h-5 w-5 mr-2" />
                                    {isDownloading
                                        ? 'Downloading...'
                                        : 'Download'}
                                </Button>
                            </div>
                            <div className="text-sm text-gray-500 mt-3">
                                Photo by{' '}
                                <a
                                    href={`${image.user.links.html}?utm_source=frameflow&utm_medium=referral`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {image.user.name}
                                </a>{' '}
                                on{' '}
                                <a
                                    href="https://unsplash.com/?utm_source=frameflow&utm_medium=referral"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Unsplash
                                </a>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AnimatePresence>
                {showLightbox && (
                    <ImageLightbox
                        src={image.urls.full}
                        alt={image.alt_description || 'Unsplash Image'}
                        downloadLocationUrl={image.links.download_location}
                        onClose={() => setShowLightbox(false)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
