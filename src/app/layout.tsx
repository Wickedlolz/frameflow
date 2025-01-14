import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'FrameFlow - Explore images in a seamless flow.',
    description:
        'FrameFlow: Discover and explore high-quality images from Unsplash. Browse curated collections, search for specific themes, and find inspiration for your projects with our responsive, user-friendly interface.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                cz-shortcut-listen="true"
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
