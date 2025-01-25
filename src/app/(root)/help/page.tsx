import type { Metadata } from 'next';
import HelpCenterHero from '@/components/help/HelpCenterHero';
import HelpCenterContent from '@/components/help/HelpCenterContent';

export const metadata: Metadata = {
    title: 'Help Center | FrameFlow - Explore images in a seamless flow.',
    description:
        'Get help and support for using FrameFlow, your go-to platform for discovering and sharing stunning images.',
};

export default function HelpCenterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <HelpCenterHero />
            <HelpCenterContent />
        </div>
    );
}
