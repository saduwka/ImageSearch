// services/allApis.ts
import { AppImage, ImagesPage, ImageSource } from "../types";
import { fetchPixabayImages } from "./pixabayApi";
import { fetchUnsplashImages } from "./unsplashApi";
import { fetchPexelsImages } from "./pexelsApi";
import { fetchNasaImages } from "./nasaApi";
import { fetchWikimediaImages } from "./wikimediaApi";
import { fetchArtImages } from "./artApi";

interface FetchAllImagesParams {
    query: string;
    source?: ImageSource; // если undefined — берем все
    page?: number;
    filter?: string;
    imageType?: string;
    orientation?: string;
}

export async function fetchAllImages({ query, source, page = 1 }: FetchAllImagesParams): Promise<ImagesPage> {
    const results: AppImage[] = [];
    const sourcesToFetch: ImageSource[] = source ? [source] : ["pixabay","unsplash","pexels","wikimedia"];

    for (const s of sourcesToFetch) {
        try {
            let chunk: AppImage[] = [];
            switch (s) {
                case "pixabay":
                    chunk = (await fetchPixabayImages(query, page)).images;
                    break;
                case "unsplash":
                    chunk = (await fetchUnsplashImages(query, page)).images;
                    break;
                case "pexels":
                    chunk = (await fetchPexelsImages(query, page)).images;
                    break;
                case "wikimedia":
                    chunk = (await fetchWikimediaImages(query, page)).images;
                    break;
            }
            results.push(...chunk);
        } catch (err) {
            console.error(`${s} API error:`, err);
        }
    }

    return {
        images: results,
        total: results.length,
        nextPage: results.length ? page + 1 : undefined
    };
}
