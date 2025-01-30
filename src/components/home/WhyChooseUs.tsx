'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Image, Users, Lock } from 'lucide-react';

const features = [
    {
        title: 'High-Quality Images',
        icon: Image,
        description:
            'Access millions of professional-grade photos from Unsplash.',
    },
    {
        title: 'User-Friendly Interface',
        icon: Zap,
        description:
            'Intuitive design for effortless image discovery and management.',
    },
    {
        title: 'Growing Community',
        icon: Users,
        description:
            'Join a vibrant community of creators and photography enthusiasts.',
    },
    {
        title: 'Secure & Free',
        icon: Lock,
        description:
            'Enjoy our service with peace of mind, completely free of charge.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
                    Why Choose FrameFlowX
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-white/20 backdrop-blur-lg border-none text-black dark:text-white h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                        <feature.icon size={24} />
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-center">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-center text-sm">
                                        {feature.description}
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
