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
    redirect('/login');
}

export async function signUp(email: string, password: string) {
    const supabase = await createClient();

    const { error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        return { error: authError.message };
    }

    // Create profile in profiles table
    // const { error: profileError } = await supabase.from('profiles').insert([
    //     {
    //         id: user?.id,
    //         name,
    //         email,
    //     },
    // ]);

    // if (profileError) {
    //     return { error: profileError.message };
    // }

    redirect('/');
}

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return { error: 'Not authenticated' };
    }

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;

    const { error } = await supabase
        .from('profiles')
        .update({
            name,
            bio,
            updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/profile');
    return { success: true };
}
