// types.ts

export type ImageSource =
    | "pixabay"
    | "unsplash"
    | "art"
    | "pexels"
    | "nasa"
    | "wikimedia";

// Для фильтров, когда можно выбирать несколько источников
export type SourceFilter = ImageSource | "both";

export interface AppImage {
    id: string;
    previewURL: string;
    largeImageURL: string;
    tags: string;
    user: string;
    likes: number;
    views: number;
    downloads: number;
    pageURL: string;
    source: ImageSource;
}

export interface ImageApiResponse {
    images: any[];
    total: number;
}

export interface ImagesPage {
    images: AppImage[];
    total: number;
    nextPage?: number;
}
