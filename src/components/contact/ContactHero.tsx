'use client';

import { motion } from 'framer-motion';

export default function ContactHero() {
    return (
        <section className="py-20 px-4 text-center">
            <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Contact Us
            </motion.h1>
            <motion.p
                className="text-xl md:text-2xl max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                We&apos;re here to help. Get in touch with us for any questions
                or feedback.
            </motion.p>
        </section>
    );
}
