'use client';

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
import { Search } from 'lucide-react';

const faqs = [
    {
        question: 'What is FrameFlow?',
        answer: 'FrameFlow is a platform for discovering and sharing high-quality images sourced from Unsplash. It allows users to search, save, and use beautiful visuals for their creative projects.',
    },
    {
        question: 'Is FrameFlow free to use?',
        answer: "Yes, FrameFlow is completely free to use. We don't have any premium plans or paid features. All of our services, including access to high-quality images from Unsplash, are provided at no cost to our users.",
    },
    {
        question: 'How do I create an account?',
        answer: "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill in your details and follow the prompts to complete the registration process.",
    },
    {
        question: 'Can I use FrameFlow images for commercial purposes?',
        answer: 'The usage rights for each image are specified on the image details page. Many images are available for commercial use, but always check the specific license for each image before using it commercially.',
    },
    {
        question: 'How do I search for images?',
        answer: "You can search for images using the search bar on the homepage or the explore page. Enter keywords related to the type of image you're looking for, and FrameFlow will display relevant results from the Unsplash collection.",
    },
    {
        question: 'Can I create collections of my favorite images?',
        answer: "Yes, you can create collections of your favorite images. Simply click the 'heart' icon on an image to save it to your likes. You can view all your liked images in your profile.",
    },
    {
        question: 'How do I download an image?',
        answer: "To download an image, click on the image to open its detail page, then click the 'Download' button. The image will be saved to your device in its original resolution.",
    },
    {
        question: 'Are the images on FrameFlow copyright-free?',
        answer: "The images on FrameFlow are provided under the Unsplash license, which allows for both commercial and non-commercial use without attribution. However, it's always best to check the specific license for each image.",
    },
    {
        question: 'Can I upload my own images to FrameFlow?',
        answer: "Currently, FrameFlow doesn't support user uploads. All images are sourced from Unsplash. If you're a photographer interested in contributing, you can do so directly through Unsplash.",
    },
    {
        question: 'How do I report a copyright infringement?',
        answer: 'If you believe that your copyright has been infringed, please contact our copyright team at copyright@frameflow.com with details of the infringement.',
    },
];

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
