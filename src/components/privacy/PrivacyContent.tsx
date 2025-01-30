'use client';

import { motion } from 'framer-motion';
import { privacySections } from '@/utils/constants';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export default function PrivacyContent() {
    return (
        <section className="py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Our Privacy Policy
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-6">
                            Last updated:{' '}
                            {new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p className="mb-6">
                            At FrameFlowX, we are committed to protecting your
                            privacy and ensuring the security of your personal
                            information. This Privacy Policy explains how we
                            collect, use, and safeguard your data when you use
                            our website and services.
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                            {privacySections.map((section, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                >
                                    <AccordionTrigger className="text-left">
                                        {section.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {section.content}
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
