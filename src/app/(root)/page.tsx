import { loadPopularImages } from '@/actions/image.action';
import Hero from '@/components/Hero';
import ImagesGrid from '@/components/ImagesGrid';

export default async function Home() {
    const images = await loadPopularImages();

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Hero />
            <ImagesGrid images={images} />
        </section>
    );
}
