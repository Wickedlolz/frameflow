'use server';

const unsplashBaseUrl = process.env.NEXT_PUBLIC_UNSPLASH_BASE_URL;
const unsplashAccessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export async function requester<T>(urlString: string) {
    if (!unsplashAccessKey) {
        throw new Error('Unsplash access key is not set!');
    }

    const url = new URL(urlString);

    if (!url.searchParams.get('page')) {
        url.searchParams.set('page', '1');
    }

    url.searchParams.set('client_id', unsplashAccessKey);

    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(unsplashBaseUrl + url.toString(), options);
    const data = await response.json();

    return data as T;
}

export async function getRandomImages() {
    const response = await fetch(
        `${unsplashBaseUrl}/photos/random?count=8&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data;
}
