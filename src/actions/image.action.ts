'use server';

const unsplashBaseUrl = process.env.NEXT_PUBLIC_UNSPLASH_BASE_URL;

// Shoud have an custom requester to handle api requests and use him in all actions?

export async function getRandomImages() {
    const response = await fetch(
        `${unsplashBaseUrl}/photos/random?count=8&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data;
}
