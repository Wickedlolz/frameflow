import type { Metadata } from 'next';
import TermsHero from '@/components/terms/TermsHero';
import TermsContent from '@/components/terms/TermsContent';

export const metadata: Metadata = {
    title: 'Terms of Service | FrameFlow - Explore images in a seamless flow.',
    description:
        'Read our Terms of Service to understand the rules and regulations governing the use of FrameFlow.',
};

export default function TermsPage() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
            <TermsHero />
            <TermsContent />
        </section>
    );
}
