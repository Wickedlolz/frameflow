export interface ICollection {
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
        bio: string | null;
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
        instagram_username: string | null;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        accepted_tos: boolean;
        for_hire: boolean;
        social: {
            instagram_username: string | null;
            portfolio_url: string | null;
            twitter_username: string | null;
            paypal_email: string | null;
        };
    };
    cover_photo: {
        id: string;
        slug: string;
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
        current_user_collections: string[];
        sponsorship: null;
        topic_submissions: Record<string, unknown>;
        user: {
            id: string;
            username: string;
            name: string;
            first_name: string;
            last_name: string;
            twitter_username: string | null;
            portfolio_url: string | null;
            bio: string | null;
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
            instagram_username: string | null;
            total_collections: number;
            total_likes: number;
            total_photos: number;
            accepted_tos: boolean;
            for_hire: boolean;
            social: {
                instagram_username: string | null;
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
        urls: {
            raw: string;
            full: string;
            regular: string;
            small: string;
            thumb: string;
            small_s3: string;
        };
    }>;
}

export interface CollectionResponse {
    results: ICollection[];
    total: number;
    total_pages: number;
}
