import Image from 'next/image';
import Link from 'next/link';
import type { IImage } from '@/interfaces/image';

type ImageCardProps = {
    image: IImage;
};

export function ImageCard({ image }: ImageCardProps) {
    const aspectRatio = image.height / image.width;

    return (
        <Link href={`/image/${image.id}`}>
            <div className="group relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <div
                    className="relative w-full"
                    style={{ paddingBottom: `${aspectRatio * 100}%` }}
                >
                    <Image
                        src={image.urls.regular || '/placeholder.svg'}
                        alt={image.alt_description || 'Image'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-lg font-semibold mb-2 text-center">
                        {image.user.name}
                    </h3>
                    <p className="text-gray-200 text-sm mb-4 text-center">
                        {image.description || image.alt_description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
