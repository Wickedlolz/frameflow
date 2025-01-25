'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log({ name, email, message });
        toast.success(
            "Message Sent. We've received your message and will get back to you soon."
        );
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Send us a message
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-1"
                            >
                                Name
                            </label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder-white/50 placeholder:text-slate-300"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-1"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder-white/50 placeholder:text-slate-300"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium mb-1"
                            >
                                Message
                            </label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder-white/50 placeholder:text-slate-300"
                                placeholder="Your message here..."
                                rows={4}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-white text-purple-600 hover:bg-white/90"
                        >
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
