import type { Metadata } from 'next';
import FAQHero from '@/components/faq/FAQHero';
import FAQContent from '@/components/faq/FAQContent';

export const metadata: Metadata = {
    title: 'FAQ | FrameFlowX - Explore images in a seamless flow.',
    description:
        'Find answers to frequently asked questions about FrameFlowX, our image discovery platform.',
};

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <FAQHero />
            <FAQContent />
        </div>
    );
}
