'use server';

import { createClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(email: string, password: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error(error);
        return error;
    }

    return null;
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/');
    redirect('/login');
}

export async function signUp(email: string, password: string, name: string) {
    const supabase = await createClient();

    const { error: authError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
    });

    if (authError) {
        return { error: authError.message };
    }

    // Create profile in profiles table
    await supabase.from('profiles').insert([
        {
            id: data.user?.id,
            name,
            email,
        },
    ]);

    return { data };
}

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const avatar_url = formData.get('avatar_url') as string;

    // Update auth metadata first
    const { error: metadataError } = await supabase.auth.updateUser({
        data: {
            full_name: name,
            avatar_url: avatar_url || null,
        },
    });

    if (metadataError) {
        return { error: metadataError.message };
    }

    // Then update profile
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            name,
            bio,
            avatar_url: avatar_url || null,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

    if (profileError) {
        return { error: profileError.message };
    }

    revalidatePath('/profile');
    return { success: true };
}
