import SearchForm from './forms/SearchForm';
import { Button } from '@/components/ui/button';

const categories = ['Popular', 'Nature', 'Architecture', 'Travel'];

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20">
            <div className="container mx-auto text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Discover Stunning Images with FrameFlow
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Explore a world of breathtaking visuals from Unsplash. Find
                    inspiration, curate your favorites, and elevate your
                    projects.
                </p>
                <SearchForm />
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant="outline"
                            className="rounded-full border-white bg-white/10 text-white hover:bg-white hover:text-purple-600 dark:border-white/80 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white dark:hover:text-purple-600 backdrop-blur-sm transition-all duration-300"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}
