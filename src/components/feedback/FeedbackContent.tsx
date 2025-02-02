'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createNewTestimonial } from '@/actions/testimonials.action';
import { toast } from 'sonner';
import { ITestimonial } from '@/interfaces/testimonials';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

type FeedbackContentProps = {
    testimonials: ITestimonial[];
};

export default function FeedbackContent({
    testimonials,
}: FeedbackContentProps) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createNewTestimonial({
                name,
                email,
                feedback_text: feedback,
                rating,
            });
            console.log({ name, email, feedback, rating });
            toast.success(
                'Feedback Submitted. Thank you for your feedback! We appreciate your input.'
            );
            setName('');
            setEmail('');
            setFeedback('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error(
                'There was a problem submitting your feedback. Please try again.'
            );
        }
    };

    return (
        <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    Share Your Feedback
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
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
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="bg-white/5 border-white/10 text-white placeholder-white/50 placeholder:text-slate-300"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="feedback"
                                            className="block text-sm font-medium mb-1"
                                        >
                                            Your Feedback
                                        </label>
                                        <Textarea
                                            id="feedback"
                                            value={feedback}
                                            onChange={(e) =>
                                                setFeedback(e.target.value)
                                            }
                                            className="bg-white/5 border-white/10 text-white placeholder-white/50 placeholder:text-slate-300"
                                            placeholder="Share your thoughts and suggestions..."
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Rate your experience
                                        </label>
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`cursor-pointer ${
                                                        star <= rating
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-white/50'
                                                    }`}
                                                    onClick={() =>
                                                        setRating(star)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-white text-purple-600 hover:bg-white/90"
                                    >
                                        Submit Feedback
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    What Our Users Say
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {testimonials.map((testimonial, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.1 * index,
                                            }}
                                        >
                                            <Card className="bg-white/5 border-none">
                                                <CardContent className="p-4">
                                                    <p className="mb-2 italic">
                                                        &quot;
                                                        {
                                                            testimonial.feedback_text
                                                        }
                                                        &quot;
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-semibold">
                                                                {
                                                                    testimonial.name
                                                                }
                                                            </p>
                                                            {/* <p className="text-sm text-white/70">
                                                                {
                                                                    testimonial.role
                                                                }
                                                            </p> */}
                                                        </div>
                                                        <div className="flex">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-4 h-4 ${
                                                                            i <
                                                                            testimonial.rating
                                                                                ? 'text-yellow-400 fill-yellow-400'
                                                                                : 'text-white/30'
                                                                        }`}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
