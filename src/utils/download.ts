'use client';

export async function downloadImage(
    downloadLocationUrl: string,
    filename: string
) {
    try {
        const imageUrl = await trackDownload(downloadLocationUrl);
        const response = await fetch(imageUrl.url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error downloading image:', error);
        throw new Error('Failed to download image');
    }
}

export async function trackDownload(downloadLocation: string) {
    try {
        const response = await fetch(downloadLocation, {
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return (await response.json()) as { url: string };
    } catch (error) {
        console.error('Error tracking download:', error);
        throw error;
    }
}
