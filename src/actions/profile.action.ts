'use server';

import { createClient } from '@/lib/supabase/server';
import { IProfile } from '@/interfaces/profile';

export async function getUserProfile() {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            throw new Error('Not authenticated');
        }

        // Get profile data
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) {
            throw error;
        }

        return profile as IProfile;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error('Failed to fetch user profile');
    }
}
