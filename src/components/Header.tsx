import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import SignOutButton from './SignOutButton';
import ThemeSwitcher from './ThemeSwitcher';

export default async function Header() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between space-x-4">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center space-x-2"
                    >
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 bg-white rounded-full transform rotate-45 group-hover:rotate-90 transition-transform duration-300 ease-in-out"></div>
                            <div className="absolute inset-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out"></div>
                            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                                F
                            </span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-wide group-hover:text-gray-200 transition-colors duration-300">
                            rame<span className="text-purple-300">Flow</span>
                        </span>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex space-x-1">
                        {['Home', 'Explore', 'Collections'].map((item) => (
                            <Button
                                key={item}
                                variant="ghost"
                                asChild
                                className="text-white hover:text-gray-200 hover:bg-white/10"
                            >
                                <Link
                                    href={
                                        item === 'Home'
                                            ? '/'
                                            : `/${item.toLowerCase()}`
                                    }
                                >
                                    {item}
                                </Link>
                            </Button>
                        ))}
                    </nav>

                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        <ThemeSwitcher />

                        {!user ? (
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:text-gray-200 hover:bg-white/10"
                                    asChild
                                >
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-white bg-white/10 text-white 
                                        hover:bg-white/20 hover:text-white hover:border-white/80
                                        dark:border-white/80 dark:bg-white/10 dark:text-white 
                                        dark:hover:bg-white/20 dark:hover:text-white dark:hover:border-white/60 
                                        backdrop-blur-sm transition-all duration-300"
                                    asChild
                                >
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </div>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user?.user_metadata.avatar_url}
                                            alt={user?.email}
                                            className="object-cover"
                                        />
                                        <AvatarFallback>
                                            {user?.email
                                                ?.split('')[0]
                                                .charAt(0)
                                                .toLocaleUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                >
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <SignOutButton />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden text-white"
                            >
                                <Menu size={24} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            {['Home', 'Explore', 'Collections'].map((item) => (
                                <DropdownMenuItem key={item} asChild>
                                    <Link
                                        href={
                                            item === 'Home'
                                                ? '/'
                                                : `/${item.toLowerCase()}`
                                        }
                                    >
                                        {item}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
