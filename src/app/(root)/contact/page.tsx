import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/forms/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import FAQ from '@/components/contact/ContactFAQ';

export const metadata: Metadata = {
    title: 'Contact Us | FrameFlow - Explore images in a seamless flow.',
    description:
        "Get in touch with FrameFlow. We're here to help with any questions or feedback you may have.",
};

export default function ContactPage() {
    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <ContactHero />
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </div>
            <FAQ />
        </section>
    );
}
