'use server';

import { createClient } from '@/lib/supabase/server';
import { IImagePreview, ILikedImage } from '@/interfaces/image';
import { revalidatePath } from 'next/cache';

export async function toggleLikeImage(image: IImagePreview) {
    try {
        const supabase = await createClient();

        // Get current user
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Check if image is already liked
        const { data: existingLike } = await supabase
            .from('liked_images')
            .select()
            .eq('user_id', user.id)
            .eq('image_id', image.id)
            .single();

        if (existingLike) {
            // Unlike: Remove from liked_images
            const { error } = await supabase
                .from('liked_images')
                .delete()
                .eq('user_id', user.id)
                .eq('image_id', image.id);

            if (error) throw error;
            return { liked: false };
        } else {
            // Like: Add to liked_images
            const { error } = await supabase.from('liked_images').insert({
                user_id: user.id,
                image_id: image.id,
                image_url: image.urls.regular,
                title: image.alt_description || 'Untitled',
                description: image.description || null,
            });

            if (error) throw error;

            revalidatePath('/profile');

            return { liked: true };
        }
    } catch (error) {
        console.error('Error toggling like:', error);
        throw new Error('Failed to toggle like');
    }
}

export async function getLikedImages() {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('liked_images')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as ILikedImage[];
    } catch (error) {
        console.error('Error fetching liked images:', error);
        throw new Error('Failed to fetch liked images');
    }
}

export async function isImageLiked(imageId: string) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return false;

        const { data } = await supabase
            .from('liked_images')
            .select('id')
            .eq('user_id', user.id)
            .eq('image_id', imageId)
            .single();

        return !!data;
    } catch (error) {
        console.error('Error checking if image is liked:', error);
        return false;
    }
}
