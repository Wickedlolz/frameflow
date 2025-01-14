import Image from 'next/image';
import Link from 'next/link';
import { IImage } from '@/interfaces/image';

type ImageCardProps = {
    image: IImage;
};

export function ImageCard({ image }: ImageCardProps) {
    return (
        <Link href={`/image/${image.id}`}>
            <Image
                src={image.urls.regular}
                alt={image.alt_description || 'Image'}
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <h3 className="text-white text-lg font-semibold mb-2 text-center">
                    {image.user.name}
                </h3>
                <p className="text-gray-200 text-sm mb-4 text-center">
                    {image.description || image.alt_description}
                </p>
            </div>
        </Link>
    );
}
