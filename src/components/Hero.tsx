import SearchForm from './forms/SearchForm';
import PopularSearch from './PopularSearch';

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-12 md:py-20">
            <div className="container mx-auto text-center px-4">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                    Discover Stunning Images with FrameFlowX
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto">
                    Explore a world of breathtaking visuals from Unsplash. Find
                    inspiration, curate your favorites, and elevate your
                    projects.
                </p>
                <SearchForm />
                <PopularSearch />
            </div>
        </section>
    );
}
