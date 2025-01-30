import Link from 'next/link';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    <div className="col-span-1 md:col-span-3 lg:col-span-2">
                        <Link href="/" className="flex items-center mb-4">
                            <div className="relative w-10 h-10 mr-2">
                                <div className="absolute inset-0 bg-white rounded-full transform rotate-45"></div>
                                <div className="absolute inset-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full transform -rotate-45"></div>
                                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                                    F
                                </span>
                            </div>
                            <span className="text-2xl font-bold tracking-wide">
                                rame
                                <span className="text-purple-300">Flow</span>
                            </span>
                            <span className="bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 bg-clip-text text-transparent text-3xl font-extrabold inline-block">
                                X
                            </span>
                        </Link>
                        <p className="text-sm mb-4">
                            Discover and share stunning images from around the
                            world. FrameFlowX brings you the best of
                            photography, powered by the Unsplash API.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-white hover:text-purple-200 transition-colors"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-purple-200 transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-purple-200 transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-purple-200 transition-colors"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/explore"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    Explore
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    Collections
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/help"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/feedback"
                                    className="hover:text-purple-200 transition-colors"
                                >
                                    Feedback
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-center md:text-left mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} FrameFlowX. All rights
                        reserved.
                    </p>
                    <p className="text-sm text-center md:text-right">
                        Powered by{' '}
                        <a
                            href="https://unsplash.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-purple-200 transition-colors"
                        >
                            Unsplash
                        </a>
                        . Images provided by talented photographers worldwide.
                    </p>
                </div>
            </div>
        </footer>
    );
}
