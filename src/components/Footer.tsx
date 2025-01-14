export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-200 py-4 text-center">
            <p>
                Images provided by{' '}
                <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-400"
                >
                    Unsplash API
                </a>
                .
            </p>
        </footer>
    );
}
