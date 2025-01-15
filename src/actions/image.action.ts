'use server';

import {
    IImage,
    IImagePreview,
    ISearchImageResponse,
} from '@/interfaces/image';
import { ICollection, CollectionResponse } from '@/interfaces/collection';

const unsplashBaseUrl = process.env.NEXT_PUBLIC_UNSPLASH_BASE_URL;
const unsplashAccessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

interface RequestParams {
    query?: string;
    orientation?: string;
    color?: string;
    orderBy?: string;
    page?: number;
    perPage?: number;
    count?: number;
}

export async function requester<T>(
    endpoint: string,
    params: RequestParams = {}
) {
    if (!unsplashAccessKey || !unsplashBaseUrl) {
        throw new Error('Unsplash configuration is not set!');
    }

    const searchParams = new URLSearchParams({
        client_id: unsplashAccessKey,
        per_page: (params.perPage || 20).toString(),
        page: (params.page || 1).toString(),
        ...(params.orderBy && { order_by: params.orderBy }),
        ...(params.orientation && { orientation: params.orientation }),
        ...(params.color && { color: params.color }),
        ...(params.count && { count: params.count.toString() }),
    });

    if (params.query) {
        searchParams.append('query', params.query);
    }

    const url = new URL(
        `${endpoint}?${searchParams.toString()}`,
        unsplashBaseUrl
    );

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
}

export async function getRandomImages() {
    return requester<IImage[]>('/photos/random', { count: 8 });
}

export async function loadPopularImages() {
    const data = await requester<ISearchImageResponse>('/search/photos', {
        query: 'popular',
        perPage: 12,
    });
    return data.results;
}

export async function fetchPhotos({
    query,
    orientation,
    color,
    orderBy = 'latest',
    page = 1,
}: RequestParams): Promise<IImage[]> {
    const endpoint = query ? '/search/photos' : '/photos';
    const data = await requester<
        typeof query extends string ? ISearchImageResponse : IImage[]
    >(endpoint, { query, orientation, color, orderBy, page });

    return query
        ? (data as unknown as ISearchImageResponse).results
        : (data as IImage[]);
}

export async function getImageById(id: string) {
    return requester<IImagePreview>(`/photos/${id}`);
}

export async function fetchCollections({
    query,
    page = 1,
    perPage = 12,
}: RequestParams): Promise<ICollection[]> {
    const endpoint = query ? '/search/collections' : '/collections';
    const data = await requester<
        typeof query extends string ? CollectionResponse : ICollection[]
    >(endpoint, { query, page, perPage });

    return query
        ? (data as unknown as CollectionResponse).results
        : (data as ICollection[]);
}

export async function fetchPaginatedCollections(
    pageParam = 1,
    searchQuery?: string
): Promise<ICollection[]> {
    const endpoint = searchQuery ? '/search/collections' : '/collections';
    const data = await requester<
        typeof searchQuery extends string ? CollectionResponse : ICollection[]
    >(endpoint, {
        query: searchQuery,
        page: pageParam,
        perPage: 12,
    });

    return searchQuery
        ? (data as unknown as CollectionResponse).results
        : (data as ICollection[]);
}
