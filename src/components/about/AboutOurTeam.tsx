'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
    { name: 'Jane Doe', role: 'CEO & Founder', image: '/team/jane-doe.jpg' },
    { name: 'John Smith', role: 'CTO', image: '/team/john-smith.jpg' },
    {
        name: 'Emily Brown',
        role: 'Head of Design',
        image: '/team/emily-brown.jpg',
    },
    {
        name: 'Michael Johnson',
        role: 'Lead Developer',
        image: '/team/michael-johnson.jpg',
    },
];

export default function OurTeam() {
    return (
        <section className="py-20 px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
                Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                            <CardHeader>
                                <Avatar className="w-24 h-24 mx-auto">
                                    <AvatarImage
                                        src={member.image}
                                        alt={member.name}
                                    />
                                    <AvatarFallback>
                                        {member.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-xl font-semibold text-center mt-4">
                                    {member.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-sm">
                                    {member.role}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
