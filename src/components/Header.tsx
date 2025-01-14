'use client';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, Moon, Sun } from 'lucide-react';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const user = {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        // Add logic here to actually change the theme
    };

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
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full text-white hover:text-gray-200 hover:bg-white/10"
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? (
                                <Sun size={20} />
                            ) : (
                                <Moon size={20} />
                            )}
                        </Button>

                        {!isLoggedIn ? (
                            <Button
                                onClick={() => setIsLoggedIn(true)}
                                variant="outline"
                                size="sm"
                                className="rounded-full border-white text-black hover:bg-white hover:text-purple-600"
                            >
                                Login
                            </Button>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback>
                                            {user.name[0]}
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
                                    <DropdownMenuItem
                                        onClick={() => setIsLoggedIn(false)}
                                    >
                                        Logout
                                    </DropdownMenuItem>
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
