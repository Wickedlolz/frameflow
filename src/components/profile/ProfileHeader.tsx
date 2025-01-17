import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Mail } from 'lucide-react';

interface ProfileHeaderProps {
    user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <Card className="mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
            <CardContent className="relative pt-16 pb-8 px-4 flex flex-col items-center">
                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                    <Image
                        src={
                            user.user_metadata.avatar_url ||
                            `https://ui-avatars.com/api/?name=${user.email}`
                        }
                        alt={user.user_metadata.full_name || user.email || ''}
                        width={128}
                        height={128}
                    />
                </div>
                <h1 className="text-2xl font-bold mt-4">
                    {user.user_metadata.full_name || user.email}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                {user.user_metadata.bio && (
                    <p className="text-center mt-2 max-w-md">
                        {user.user_metadata.bio}
                    </p>
                )}
                <div className="flex gap-4 mt-4">
                    <Button variant="outline">
                        <Edit size={16} className="mr-2" />
                        Edit Profile
                    </Button>
                    <Button variant="outline">
                        <Mail size={16} className="mr-2" />
                        Message
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
