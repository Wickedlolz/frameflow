'use client';

import { useActionState } from 'react';
import { login } from '@/actions/auth';
import { motion } from 'framer-motion';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { TriangleAlert } from 'lucide-react';

const initialState = { error: null as string | null };

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(
        async (prevState: typeof initialState, formData: FormData) => {
            return login(formData);
        },
        initialState
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form action={formAction} className="space-y-6">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                </div>
                {state.error && (
                    <Alert variant="destructive">
                        <TriangleAlert className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                )}
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
                    disabled={isPending}
                >
                    {isPending ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
        </motion.div>
    );
}
