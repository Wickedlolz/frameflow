import SearchForm from './forms/SearchForm';
import { Button } from '@/components/ui/button';

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
                    {['Popular', 'Nature', 'Architecture', 'Travel'].map(
                        (category) => (
                            <Button
                                key={category}
                                variant="outline"
                                className="rounded-full border-white text-gray-500 hover:bg-white hover:text-purple-600"
                            >
                                {category}
                            </Button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
