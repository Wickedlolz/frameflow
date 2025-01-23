'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const privacySections = [
    {
        title: 'Information We Collect',
        content:
            'We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include your name, email address, and usage data.',
    },
    {
        title: 'How We Use Your Information',
        content:
            'We use your information to provide, maintain, and improve our services, to communicate with you, and to personalize your experience on FrameFlow.',
    },
    {
        title: 'Information Sharing and Disclosure',
        content:
            'We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, or when required by law.',
    },
    {
        title: 'Data Security',
        content:
            'We implement appropriate technical and organizational measures to protect the security of your personal information against unauthorized access, disclosure, alteration, and destruction.',
    },
    {
        title: 'Your Rights and Choices',
        content:
            'You have the right to access, correct, or delete your personal information. You can also opt out of certain data collection and use practices.',
    },
    {
        title: 'Changes to This Policy',
        content:
            'We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.',
    },
    {
        title: 'Contact Us',
        content:
            'If you have any questions about this privacy policy, please contact us at privacy@frameflow.com.',
    },
];

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
                            At FrameFlow, we are committed to protecting your
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
