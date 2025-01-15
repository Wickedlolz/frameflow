'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

interface FilterState {
    orientation: string;
    color: string;
    orderBy: string;
}

export default function ExploreFilters({
    initialOrientation = '',
    initialColor = '',
    initialOrderBy = 'latest',
}) {
    const [filters, setFilters] = useState<FilterState>({
        orientation: initialOrientation,
        color: initialColor,
        orderBy: initialOrderBy,
    });
    const router = useRouter();

    const updateFilters = (key: keyof FilterState, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== 'any') {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        });
        router.push(`/explore?${searchParams.toString()}`, { scroll: false });
    }, [filters, router]);

    return (
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                    <SheetDescription>
                                        Refine your photo search
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Orientation
                                        </label>
                                        <Select
                                            value={filters.orientation}
                                            onValueChange={(value) =>
                                                updateFilters(
                                                    'orientation',
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Any orientation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="any">
                                                    Any orientation
                                                </SelectItem>
                                                <SelectItem value="landscape">
                                                    Landscape
                                                </SelectItem>
                                                <SelectItem value="portrait">
                                                    Portrait
                                                </SelectItem>
                                                <SelectItem value="squarish">
                                                    Square
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Color
                                        </label>
                                        <Select
                                            value={filters.color}
                                            onValueChange={(value) =>
                                                updateFilters('color', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Any color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="any">
                                                    Any color
                                                </SelectItem>
                                                <SelectItem value="black_and_white">
                                                    Black & White
                                                </SelectItem>
                                                <SelectItem value="black">
                                                    Black
                                                </SelectItem>
                                                <SelectItem value="white">
                                                    White
                                                </SelectItem>
                                                <SelectItem value="yellow">
                                                    Yellow
                                                </SelectItem>
                                                <SelectItem value="orange">
                                                    Orange
                                                </SelectItem>
                                                <SelectItem value="red">
                                                    Red
                                                </SelectItem>
                                                <SelectItem value="purple">
                                                    Purple
                                                </SelectItem>
                                                <SelectItem value="magenta">
                                                    Magenta
                                                </SelectItem>
                                                <SelectItem value="green">
                                                    Green
                                                </SelectItem>
                                                <SelectItem value="teal">
                                                    Teal
                                                </SelectItem>
                                                <SelectItem value="blue">
                                                    Blue
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <Select
                            value={filters.orderBy}
                            onValueChange={(value) =>
                                updateFilters('orderBy', value)
                            }
                        >
                            <SelectTrigger className="w-[140px]">
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="latest">Latest</SelectItem>
                                <SelectItem value="relevant">
                                    Relevant
                                </SelectItem>
                                <SelectItem value="popular">Popular</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}
