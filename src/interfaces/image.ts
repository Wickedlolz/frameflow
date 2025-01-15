export interface IImage {
    id: string;
    slug: string;
    alternative_slugs: {
        en: string;
        es: string;
        ja: string;
        fr: string;
        it: string;
        ko: string;
        de: string;
        pt: string;
    };
    created_at: string;
    updated_at: string;
    promoted_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: [];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    likes: number;
    liked_by_user: boolean;
    current_user_collections: [];
    sponsorship: null;
    topic_submissions: {
        'street-photography': {
            status: string;
            approved_on: string;
        };
    };
    asset_type: string;
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string;
        twitter_username: null;
        portfolio_url: null;
        bio: string;
        location: string;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
        };
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        instagram_username: string;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        total_promoted_photos: number;
        total_illustrations: number;
        total_promoted_illustrations: number;
        accepted_tos: boolean;
        for_hire: boolean;
        social: {
            instagram_username: string;
            portfolio_url: string | null;
            twitter_username: string | null;
            paypal_email: string | null;
        };
    };
}

export interface ISearchImageResponse {
    results: IImage[];
}

export interface IImagePreview {
    id: string;
    slug: string;
    alternative_slugs: {
        en: string;
        es: string;
        ja: string;
        fr: string;
        it: string;
        ko: string;
        de: string;
        pt: string;
    };
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string | null;
    alt_description: string | null;
    breadcrumbs: Array<never>;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    likes: number;
    liked_by_user: boolean;
    current_user_collections: Array<never>;
    sponsorship: null;
    topic_submissions: Record<
        string,
        {
            status: string;
            approved_on?: string;
        }
    >;
    asset_type: string;
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string;
        twitter_username: string | null;
        portfolio_url: string | null;
        bio: string;
        location: string;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
        };
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        instagram_username: string;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        total_promoted_photos: number;
        total_illustrations: number;
        total_promoted_illustrations: number;
        accepted_tos: boolean;
        for_hire: boolean;
        social: {
            instagram_username: string;
            portfolio_url: string | null;
            twitter_username: string | null;
            paypal_email: string | null;
        };
    };
    exif?: {
        make: string;
        model: string;
        name: string;
        exposure_time: string;
        aperture: string;
        focal_length: string;
        iso: number;
    };
    location?: {
        name: string;
        city: string;
        country: string;
        position: {
            latitude: number;
            longitude: number;
        };
    };
    meta: {
        index: boolean;
    };
    public_domain: boolean;
    tags: Array<{
        type: string;
        title: string;
    }>;
    views: number;
    downloads: number;
    topics: Array<never>;
    related_collections: {
        total: number;
        type: string;
        results: Array<{
            id: string;
            title: string;
            description: string | null;
            published_at: string;
            last_collected_at: string;
            updated_at: string;
            featured: boolean;
            total_photos: number;
            private: boolean;
            share_key: string;
            tags: Array<{
                type: string;
                title: string;
            }>;
            links: {
                self: string;
                html: string;
                photos: string;
                related: string;
            };
            user: {
                id: string;
                updated_at: string;
                username: string;
                name: string;
                first_name: string;
                last_name: string;
                twitter_username: string | null;
                portfolio_url: string | null;
                bio: string;
                location: string;
                links: {
                    self: string;
                    html: string;
                    photos: string;
                    likes: string;
                    portfolio: string;
                    following: string;
                    followers: string;
                };
                profile_image: {
                    small: string;
                    medium: string;
                    large: string;
                };
                instagram_username: string;
                total_collections: number;
                total_likes: number;
                total_photos: number;
                total_promoted_photos: number;
                total_illustrations: number;
                total_promoted_illustrations: number;
                accepted_tos: boolean;
                for_hire: boolean;
                social: {
                    instagram_username: string;
                    portfolio_url: string | null;
                    twitter_username: string | null;
                    paypal_email: string | null;
                };
            };
            cover_photo: {
                id: string;
                slug: string;
                alternative_slugs: {
                    en: string;
                    es: string;
                    ja: string;
                    fr: string;
                    it: string;
                    ko: string;
                    de: string;
                    pt: string;
                };
                created_at: string;
                updated_at: string;
                promoted_at: string | null;
                width: number;
                height: number;
                color: string;
                blur_hash: string;
                description: string | null;
                alt_description: string | null;
                urls: {
                    raw: string;
                    full: string;
                    regular: string;
                    small: string;
                    thumb: string;
                    small_s3: string;
                };
                links: {
                    self: string;
                    html: string;
                    download: string;
                    download_location: string;
                };
                likes: number;
                liked_by_user: boolean;
                current_user_collections: Array<never>;
                sponsorship: null;
                topic_submissions: Record<string, never>;
                asset_type: string;
                user: {
                    id: string;
                    updated_at: string;
                    username: string;
                    name: string;
                    first_name: string;
                    last_name: string;
                    twitter_username: string | null;
                    portfolio_url: string | null;
                    bio: string;
                    location: string | null;
                    links: {
                        self: string;
                        html: string;
                        photos: string;
                        likes: string;
                        portfolio: string;
                        following: string;
                        followers: string;
                    };
                    profile_image: {
                        small: string;
                        medium: string;
                        large: string;
                    };
                    instagram_username: string;
                    total_collections: number;
                    total_likes: number;
                    total_photos: number;
                    total_promoted_photos: number;
                    total_illustrations: number;
                    total_promoted_illustrations: number;
                    accepted_tos: boolean;
                    for_hire: boolean;
                    social: {
                        instagram_username: string;
                        portfolio_url: string | null;
                        twitter_username: string | null;
                        paypal_email: string | null;
                    };
                };
            };
            preview_photos: Array<{
                id: string;
                slug: string;
                created_at: string;
                updated_at: string;
                blur_hash: string;
                asset_type: string;
                urls: {
                    raw: string;
                    full: string;
                    regular: string;
                    small: string;
                    thumb: string;
                    small_s3: string;
                };
            }>;
        }>;
    };
}
