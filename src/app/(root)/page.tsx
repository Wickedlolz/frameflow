import { createClient } from '@/lib/supabase/server';
import { loadPopularImages } from '@/actions/image.action';

import Hero from '@/components/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import JoinCommunity from '@/components/home/JoinCommunity';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ImagesGrid from '@/components/ImagesGrid';

export default async function Home() {
    const supabase = await createClient();
    const images = await loadPopularImages();
    const { data } = await supabase.auth.getUser();

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Hero />
            <ImagesGrid images={images} />
            <HowItWorks />
            <WhyChooseUs />
            {!data.user && <JoinCommunity />}
        </section>
    );
}
