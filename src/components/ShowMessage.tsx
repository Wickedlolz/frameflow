'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

interface ShowMessageProps {
    message: string;
}

export default function ShowMessage({ message }: ShowMessageProps) {
    useEffect(() => {
        toast.success(message);
    }, [message]);

    return null;
}
