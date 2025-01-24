'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Heart, Download } from 'lucide-react';

const steps = [
    {
        title: 'Search',
        icon: Search,
        description:
            'Find the perfect image for your project using our powerful search.',
    },
    {
        title: 'Save',
        icon: Heart,
        description:
            'Like and save your favorite images to your personal collection.',
    },
    {
        title: 'Use',
        icon: Download,
        description:
            'Download and use high-quality images for your creative projects.',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card className="bg-white/20 backdrop-blur-lg border-none text-black dark:text-white">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                        <step.icon size={32} />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-center">
                                        {step.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-center">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
