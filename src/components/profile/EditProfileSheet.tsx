'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IProfile } from '@/interfaces/profile';

import { toast } from 'sonner';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';
import { updateProfile } from '@/actions/auth';
import Image from 'next/image';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
    avatar_url: z.string().url('Please enter a valid URL').optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileSheetProps {
    user: IProfile;
}

export default function EditProfileSheet({ user }: EditProfileSheetProps) {
    const [open, setOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(user.avatar_url || '');
    const router = useRouter();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || '',
            bio: user.bio || '',
            avatar_url: user.avatar_url || '',
        },
    });

    const avatarUrl = form.watch('avatar_url');

    useEffect(() => {
        if (avatarUrl && avatarUrl !== previewUrl) {
            setPreviewUrl(avatarUrl);
        }
    }, [avatarUrl, previewUrl]);

    const onSubmit = async (values: ProfileFormValues) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('bio', values.bio || '');
            formData.append('avatar_url', values.avatar_url || '');

            const result = await updateProfile(formData);

            if (result.error) {
                throw new Error(result.error);
            }

            toast.success('Profile updated successfully!');
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to update profile'
            );
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-8"
                    >
                        <div className="space-y-4">
                            {previewUrl && (
                                <div className="flex justify-center">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                                        <Image
                                            src={previewUrl}
                                            alt="Profile preview"
                                            fill
                                            className="object-cover"
                                            onError={() => {
                                                setPreviewUrl(
                                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        form.getValues(
                                                            'name'
                                                        ) ||
                                                            user.email ||
                                                            'User'
                                                    )}`
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="avatar_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Image URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="url"
                                                placeholder="https://example.com/avatar.jpg"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Tell us about yourself"
                                            className="resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            >
                                {form.formState.isSubmitting
                                    ? 'Saving...'
                                    : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
