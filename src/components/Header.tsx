import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/lib/utils';

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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';

export default async function Header() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const NavItems = ({ isSideBar }: { isSideBar?: boolean }) => (
        <>
            <Link
                href="/"
                className={`${cn(
                    isSideBar
                        ? 'text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-400'
                        : 'text-white hover:text-gray-300'
                )}`}
            >
                Home
            </Link>
            <Link
                href="/explore"
                className={`${cn(
                    isSideBar
                        ? 'text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-400'
                        : 'text-white hover:text-gray-300'
                )}`}
            >
                Explore
            </Link>
            <Link
                href="/collections"
                className={`${cn(
                    isSideBar
                        ? 'text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-400'
                        : 'text-white hover:text-gray-300'
                )}`}
            >
                Collections
            </Link>
        </>
    );

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
                        <span className="bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 bg-clip-text text-transparent text-3xl font-extrabold inline-block">
                            X
                        </span>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex space-x-6">
                        <NavItems />
                    </nav>

                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        <ThemeSwitcher />

                        {!user ? (
                            <div className="hidden md:flex items-center space-x-4">
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden text-white"
                            >
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[300px] sm:w-[400px]"
                        >
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                                <SheetDescription>
                                    Navigation menu for FrameFlowX
                                </SheetDescription>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-4 pt-5">
                                <NavItems isSideBar />
                                {!user && (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-purple-600 hover:text-purple-700"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="text-purple-600 hover:text-purple-700"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
