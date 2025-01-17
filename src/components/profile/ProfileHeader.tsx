import Image from 'next/image';
import { IProfile } from '@/interfaces/profile';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import EditProfileSheet from './EditProfileSheet';

interface ProfileHeaderProps {
    user: IProfile;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <Card className="mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
            <CardContent className="relative pt-16 pb-8 px-4 flex flex-col items-center">
                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                    <Image
                        src={
                            user.avatar_url ||
                            `https://ui-avatars.com/api/?name=${user.email}`
                        }
                        alt={user.name || user.email || ''}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                    />
                </div>
                <h1 className="text-2xl font-bold mt-4">
                    {user.name || user.email}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                {user.bio && (
                    <p className="text-center mt-2 max-w-md">{user.bio}</p>
                )}
                <div className="flex gap-4 mt-4">
                    <EditProfileSheet user={user} />
                    <Button variant="outline">
                        <Mail size={16} className="mr-2" />
                        Message
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
