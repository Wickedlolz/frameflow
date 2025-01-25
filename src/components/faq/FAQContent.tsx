'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '@/utils/constants';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function FAQContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openItem, setOpenItem] = useState<string | null>(null);

    const filteredFAQs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                placeholder="Search FAQs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 placeholder:text-slate-300"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Frequently Asked Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {filteredFAQs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <AccordionItem value={`item-${index}`}>
                                        <AccordionTrigger
                                            onClick={() =>
                                                setOpenItem(
                                                    openItem === `item-${index}`
                                                        ? null
                                                        : `item-${index}`
                                                )
                                            }
                                            className="text-left"
                                        >
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}
