'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Contact Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5" />
                        <span>123 FrameFlowX St, San Francisco, CA 94105</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5" />
                        <span>support@frameflowx.com</span>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                            Office Hours
                        </h3>
                        <p>Monday - Friday: 9:00 AM - 5:00 PM (PST)</p>
                        <p>Saturday - Sunday: Closed</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
