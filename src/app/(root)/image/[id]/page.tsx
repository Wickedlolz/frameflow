import { getImageById } from '@/actions/image.action';
import { isImageLiked } from '@/actions/liked-images.action';
import ImageDetails from '@/components/image/ImageDetails';

interface ImagePageProps {
    params: {
        id: string;
    };
}

export default async function ImagePage({ params }: ImagePageProps) {
    const [image, isLiked] = await Promise.all([
        getImageById(params.id),
        isImageLiked(params.id),
    ]);

    return (
        <div className="container mx-auto px-4 py-8">
            <ImageDetails image={image} initialLikedState={isLiked} />
        </div>
    );
}
