'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, User, Image as ImageIcon } from 'lucide-react';
import { ICollection } from '@/interfaces/collection';

interface CollectionHeaderProps {
    collection: ICollection;
}

export default function CollectionHeader({
    collection,
}: CollectionHeaderProps) {
    const router = useRouter();
    console.log('collection', collection);

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

            <Card className="mb-12">
                <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative aspect-video">
                            <Image
                                src={collection.cover_photo.urls.regular}
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
                                    src={collection.user.profile_image.medium}
                                    alt={collection.user.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-4"
                                />
                                <div>
                                    <Link
                                        href={collection.user.links.html}
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
                                        {collection.total_photos} Contributors
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
