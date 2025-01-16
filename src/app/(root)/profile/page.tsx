import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getLikedImages } from '@/actions/liked-images.action';

import ProfileHeader from '@/components/profile/ProfileHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Profile | FrameFlow - Explore images in a seamless flow.',
};

export default async function ProfilePage() {
    const likedImages = await getLikedImages();
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
            <div className="container mx-auto px-4 py-8">
                <ProfileHeader user={session.user} />
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <Button
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-800"
                            asChild
                        >
                            <Link href="/profile">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Profile
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold mt-4 text-white">
                            Liked Images
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {likedImages.map((image) => (
                            <Link
                                key={image.id}
                                href={`/image/${image.image_id}`}
                                className="block group"
                            >
                                <div className="relative aspect-square rounded-lg overflow-hidden">
                                    <Image
                                        src={image.image_url}
                                        alt={image.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    {image.title}
                                </h3>
                            </Link>
                        ))}
                    </div>

                    {likedImages.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">
                                You haven&apos;t liked any images yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
