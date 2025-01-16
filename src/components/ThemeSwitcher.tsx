'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-white hover:text-gray-200 hover:bg-white/10 w-10 h-10"
            >
                <Sun size={20} />
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-white hover:text-gray-200 hover:bg-white/10 w-10 h-10"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
    );
}
