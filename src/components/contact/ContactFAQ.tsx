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

const faqs = [
    {
        question: 'How do I create an account?',
        answer: "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill in your details and follow the prompts to complete the registration process.",
    },
    {
        question: 'Is FrameFlowX free to use?',
        answer: "Yes, FrameFlowX is completely free to use. We don't have any premium plans or paid features. All of our services, including access to high-quality images from Unsplash, are provided at no cost to our users.",
    },
    {
        question: 'Where do the images on FrameFlowX come from?',
        answer: "All images on FrameFlowX are sourced from Unsplash via their API. Unsplash provides a vast collection of high-quality, freely usable images from photographers around the world. We don't own the rights to these images, but make them accessible through our platform in accordance with Unsplash's license terms.",
    },
    {
        question: 'How can I report a copyright infringement?',
        answer: 'If you believe that your copyright has been infringed, please contact our copyright team at copyright@frameflowx.com with details of the infringement.',
    },
    {
        question: 'Can I use FrameFlowX images for commercial purposes?',
        answer: 'The usage rights for each image are specified on the image details page. Many images are available for commercial use, but always check the specific license for each image before using it commercially.',
    },
];

export default function FAQ() {
    const [openItem, setOpenItem] = useState<string | null>(null);

    return (
        <section className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">
                            Frequently Asked Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                >
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
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}
