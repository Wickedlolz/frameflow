import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutOurMission from '@/components/about/AboutOurMission';
import OurTeam from '@/components/about/AboutOurTeam';
import OurValues from '@/components/about/AboutOurValues';

export const metadata: Metadata = {
    title: 'About Us | FrameFlow - Explore images in a seamless flow.',
    description:
        "Learn about FrameFlow's mission, team, and values. Discover how we're revolutionizing the way people find and share stunning images.",
};

export default function AboutPage() {
    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <AboutHero />
            <AboutOurMission />
            <OurTeam />
            <OurValues />
        </section>
    );
}
