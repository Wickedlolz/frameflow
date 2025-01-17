'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(email: string, password: string) {
    const supabase = createServerActionClient({ cookies });

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
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    redirect('/login');
}

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const supabase = createServerActionClient({ cookies });

    const {
        error: authError,
        data: { user },
    } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        return { error: authError.message };
    }

    // Create profile in profiles table
    const { error: profileError } = await supabase.from('profiles').insert([
        {
            id: user?.id,
            name,
            email,
        },
    ]);

    if (profileError) {
        return { error: profileError.message };
    }

    redirect('/');
}

export async function updateProfile(formData: FormData) {
    const supabase = createServerActionClient({ cookies });
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
