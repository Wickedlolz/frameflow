import { loadPopularImages } from '@/actions/image.action';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import JoinCommunity from '@/components/home/JoinCommunity';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ImagesGrid from '@/components/ImagesGrid';

export default async function Home() {
    const images = await loadPopularImages();

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Hero />
            <ImagesGrid images={images} />
            <HowItWorks />
            <WhyChooseUs />
            <JoinCommunity />
        </section>
    );
}
