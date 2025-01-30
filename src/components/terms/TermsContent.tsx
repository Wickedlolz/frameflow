'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const termsSection = [
    {
        title: 'Acceptance of Terms',
        content:
            'By accessing or using FrameFlowX, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.',
    },
    {
        title: 'Use of Service',
        content:
            'FrameFlowX provides a platform for discovering and sharing images sourced from Unsplash. You may use the images in accordance with the Unsplash license. You agree not to use our service for any unlawful purposes or in any way that could damage, disable, overburden, or impair our servers or networks.',
    },
    {
        title: 'User Accounts',
        content:
            'To access certain features of FrameFlowX, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.',
    },
    {
        title: 'Intellectual Property',
        content:
            'The FrameFlowX service and its original content, features, and functionality are owned by FrameFlowX and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.',
    },
    {
        title: 'Image Usage and Rights',
        content:
            'All images available through FrameFlowX are sourced from Unsplash and are subject to the Unsplash license. FrameFlowX does not claim ownership of these images. Users are responsible for complying with the Unsplash license when using images obtained through our service.',
    },
    {
        title: 'Limitation of Liability',
        content:
            'FrameFlowX shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.',
    },
    {
        title: 'Modifications to Service',
        content:
            'FrameFlowX reserves the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. We shall not be liable to you or to any third party for any modification, price change, suspension or discontinuance of the service.',
    },
    {
        title: 'Governing Law',
        content:
            'These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.',
    },
    {
        title: 'Changes to Terms',
        content:
            "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.",
    },
    {
        title: 'Contact Us',
        content:
            'If you have any questions about these Terms, please contact us at terms@frameflowx.com.',
    },
];

export default function TermsContent() {
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
                            Our Terms of Service
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
                            Welcome to FrameFlow. These Terms of Service govern
                            your use of our website and services. By using
                            FrameFlow, you agree to these terms. Please read
                            them carefully.
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                            {termsSection.map((section, index) => (
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
