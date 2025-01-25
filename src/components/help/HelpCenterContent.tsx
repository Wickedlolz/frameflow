'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight } from 'lucide-react';

const helpCategories = [
    {
        title: 'Getting Started',
        items: [
            {
                title: 'Creating an account',
                content:
                    'Learn how to create your FrameFlow account and set up your profile.',
            },
            {
                title: 'Navigating the platform',
                content:
                    "Discover how to use FrameFlow's interface and find your way around.",
            },
            {
                title: 'Basic search techniques',
                content:
                    'Master the art of finding the perfect images using our search functionality.',
            },
        ],
    },
    {
        title: 'Using FrameFlow',
        items: [
            {
                title: 'Saving and organizing images',
                content:
                    'Learn how to save your favorite images and create collections.',
            },
            {
                title: 'Downloading images',
                content:
                    'Understand the process of downloading images and the associated rights.',
            },
            {
                title: 'Sharing images and collections',
                content:
                    'Discover how to share your curated collections with others.',
            },
        ],
    },
    {
        title: 'Account Management',
        items: [
            {
                title: 'Updating your profile',
                content:
                    'Keep your profile information up-to-date and personalized.',
            },
            {
                title: 'Password and security',
                content:
                    'Learn how to change your password and keep your account secure.',
            },
            {
                title: 'Deleting your account',
                content:
                    'Understand the process and implications of deleting your FrameFlow account.',
            },
        ],
    },
    {
        title: 'Troubleshooting',
        items: [
            {
                title: 'Common issues',
                content:
                    'Find solutions to frequently encountered problems on FrameFlow.',
            },
            {
                title: 'Reporting bugs',
                content:
                    'Learn how to report bugs and help improve the FrameFlow experience.',
            },
            {
                title: 'Contacting support',
                content:
                    'Get in touch with our support team for personalized assistance.',
            },
        ],
    },
];

export default function HelpCenterContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(
        null
    );

    const filteredCategories = helpCategories
        .map((category) => ({
            ...category,
            items: category.items.filter(
                (item) =>
                    item.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.content
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            ),
        }))
        .filter((category) => category.items.length > 0);

    return (
        <section className="py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <Card className="bg-white/10 backdrop-blur-lg border-none text-white mb-8">
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search for help..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
                            />
                        </div>
                    </CardContent>
                </Card>

                {filteredCategories.map((category, categoryIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: categoryIndex * 0.1,
                        }}
                    >
                        <Card className="bg-white/10 backdrop-blur-lg border-none text-white mb-6">
                            <CardHeader>
                                <CardTitle
                                    className="text-2xl font-bold cursor-pointer flex items-center justify-between"
                                    onClick={() =>
                                        setExpandedCategory(
                                            expandedCategory === category.title
                                                ? null
                                                : category.title
                                        )
                                    }
                                >
                                    {category.title}
                                    <ChevronRight
                                        className={`transform transition-transform ${
                                            expandedCategory === category.title
                                                ? 'rotate-90'
                                                : ''
                                        }`}
                                    />
                                </CardTitle>
                            </CardHeader>
                            {expandedCategory === category.title && (
                                <CardContent>
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                    >
                                        {category.items.map(
                                            (item, itemIndex) => (
                                                <AccordionItem
                                                    key={item.title}
                                                    value={`${category.title}-${itemIndex}`}
                                                >
                                                    <AccordionTrigger className="text-left">
                                                        {item.title}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        {item.content}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )
                                        )}
                                    </Accordion>
                                </CardContent>
                            )}
                        </Card>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-xl mb-4">
                        Can&apos;t find what you&apos;re looking for?
                    </p>
                    <Button
                        asChild
                        className="bg-white text-purple-600 hover:bg-white/90"
                    >
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
