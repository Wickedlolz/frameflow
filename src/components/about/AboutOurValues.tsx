'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Heart, Users, Zap } from 'lucide-react';

const values = [
    {
        title: 'Quality',
        icon: Camera,
        description:
            'We curate only the highest quality images to inspire and delight.',
    },
    {
        title: 'Community',
        icon: Users,
        description:
            'We foster a supportive community of creators and enthusiasts.',
    },
    {
        title: 'Passion',
        icon: Heart,
        description: "We're passionate about the power of visual storytelling.",
    },
    {
        title: 'Innovation',
        icon: Zap,
        description: 'We continuously innovate to improve the user experience.',
    },
];

export default function OurValues() {
    return (
        <section className="py-20 px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {values.map((value, index) => (
                    <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="bg-white/10 backdrop-blur-lg border-none text-white h-full">
                            <CardHeader>
                                <value.icon className="w-12 h-12 mx-auto mb-4" />
                                <CardTitle className="text-xl font-semibold text-center">
                                    {value.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center">
                                    {value.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
