import { getImageById } from '@/actions/image.action';
import { isImageLiked } from '@/actions/liked-images.action';
import ImageDetails from '@/components/image/ImageDetails';

type Params = Promise<{ id: string }>;

interface ImagePageProps {
    params: Params;
}

export default async function ImagePage({ params }: ImagePageProps) {
    const { id } = await params;
    const [image, isLiked] = await Promise.all([
        getImageById(id),
        isImageLiked(id),
    ]);

    return (
        <div className="container mx-auto px-4 py-8">
            <ImageDetails image={image} initialLikedState={isLiked} />
        </div>
    );
}
