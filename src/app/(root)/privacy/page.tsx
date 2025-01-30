import type { Metadata } from 'next';
import PrivacyHero from '@/components/privacy/PrivacyHero';
import PrivacyContent from '@/components/privacy/PrivacyContent';

export const metadata: Metadata = {
    title: 'Privacy Policy | FrameFlowX - Explore images in a seamless flow.',
    description:
        'Learn about how FrameFlowX collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <PrivacyHero />
            <PrivacyContent />
        </section>
    );
}
