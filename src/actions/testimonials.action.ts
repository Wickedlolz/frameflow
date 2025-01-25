'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { ITestimonial } from '@/interfaces/testimonials';

export async function getTestimonials() {
    try {
        const supabase = await createClient();

        const { data: testimonials, error } = await supabase
            .from('feedback')
            .select('name, feedback_text, rating')
            .order('created_at', { ascending: false })
            .limit(3);

        if (error) {
            throw error;
        }

        return testimonials as ITestimonial[];
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw new Error('Failed to fetch testimonials');
    }
}

export async function createNewTestimonial(testimonial: Partial<ITestimonial>) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase.from('feedback').insert([
            {
                name: testimonial.name,
                email: testimonial.email,
                feedback_text: testimonial.feedback_text,
                rating: testimonial.rating,
            },
        ]);

        if (error) {
            throw error;
        }

        revalidatePath('/feedback');

        return data;
    } catch (error) {
        console.error('Error creating new testimonial:', error);
        throw new Error('Failed to create new testimonial');
    }
}
