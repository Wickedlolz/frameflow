import type { Metadata } from 'next';
import FeedbackHero from '@/components/feedback/FeedbackHero';
import FeedbackContent from '@/components/feedback/FeedbackContent';

export const metadata: Metadata = {
    title: 'Feedback | FrameFlow - Explore images in a seamless flow.',
    description:
        'Share your thoughts and experiences with FrameFlow. Help us improve and shape the future of our platform.',
};

export default function FeedbackPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <FeedbackHero />
            <FeedbackContent />
        </div>
    );
}
