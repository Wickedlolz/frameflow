'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { downloadImage } from '@/utils/download';

interface ImageLightboxProps {
    src: string;
    alt: string;
    downloadLocationUrl: string;
    onClose: () => void;
}

export default function ImageLightbox({
    src,
    alt,
    downloadLocationUrl,
    onClose,
}: ImageLightboxProps) {
    const [scale, setScale] = useState(1);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 3));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 0.5));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleDownload = async (e: React.MouseEvent) => {
        try {
            e.stopPropagation();
            setIsDownloading(true);
            const filename = `${alt || 'unsplash-image'}.jpg`;
            await downloadImage(downloadLocationUrl, filename);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={onClose}
        >
            <div className="absolute top-4 right-4 flex gap-2 z-[60] p-2 rounded-lg bg-black/60 backdrop-blur-sm">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 shadow-lg disabled:opacity-50"
                    onClick={handleDownload}
                    disabled={isDownloading}
                >
                    <Download className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 shadow-lg"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleZoomOut();
                    }}
                >
                    <ZoomOut className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 shadow-lg"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleZoomIn();
                    }}
                >
                    <ZoomIn className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 shadow-lg"
                    onClick={onClose}
                >
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <motion.div
                className="relative w-[90vw] h-[90vh] pointer-events-none"
                animate={{ scale }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain pointer-events-auto"
                    quality={100}
                    priority
                />
            </motion.div>
        </motion.div>
    );
}
