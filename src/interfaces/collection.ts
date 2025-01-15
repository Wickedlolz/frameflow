export interface ICollection {
    id: string;
    title: string;
    description: string | null;
    total_photos: number;
    user: {
        name: string;
        username: string;
    };
    cover_photo: {
        urls: {
            regular: string;
        };
    };
}

export interface CollectionResponse {
    results: ICollection[];
    total: number;
    total_pages: number;
}
