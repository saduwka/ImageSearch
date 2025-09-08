import { AppImage, ImagesPage } from "../types";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY as string;

export async function fetchUnsplashImages(query: string, page = 1): Promise<ImagesPage> {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
    )}&per_page=30&page=${page}&client_id=${UNSPLASH_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    const images: AppImage[] = data.results.map((img: any) => ({
        id: `unsplash-${img.id}`,
        previewURL: img.urls.thumb,
        largeImageURL: img.urls.full,
        tags: img.alt_description || "",
        user: img.user?.name || "Unknown",
        likes: img.likes || 0,
        views: 0,
        downloads: 0,
        pageURL: img.links?.html || "",
        source: "unsplash",
    }));

    return {
        images,
        total: images.length,
        nextPage: images.length ? page + 1 : undefined,
    };
}
