import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OurMission() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">
                            Our Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-center">
                            At FrameFlow, we&apos;re on a mission to simplify
                            the discovery and sharing of stunning imagery. We
                            leverage the vast collection of the Unsplash API to
                            connect users with high-quality, freely usable
                            images from talented photographers worldwide. Our
                            goal is to inspire creativity and enhance visual
                            communication by providing an intuitive platform for
                            exploring and utilizing these beautiful visuals in
                            various projects and ideas.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
