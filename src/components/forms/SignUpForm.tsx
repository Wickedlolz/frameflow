'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { signUp } from '@/actions/auth';

const signUpSchema = z
    .object({
        name: z
            .string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be less than 50 characters'),
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: SignUpFormValues) => {
        try {
            setError(null);
            const { error: signUpError } = await signUp(
                values.email,
                values.password,
                values.name
            );

            if (signUpError) throw signUpError;

            router.push(
                '/login?message=Check your email to confirm your account'
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="John Doe"
                                    autoComplete="name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="you@example.com"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <Alert variant="destructive">
                        <TriangleAlert className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? 'Signing up...' : 'Sign up'}
                </Button>
            </form>
        </Form>
    );
}
