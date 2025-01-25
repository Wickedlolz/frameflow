'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { helpCategories } from '@/utils/constants';

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
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100" />
                            <Input
                                type="text"
                                placeholder="Search for help..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 placeholder:text-slate-300"
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
