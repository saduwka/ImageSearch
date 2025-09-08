import { AppImage, ImagesPage } from "../types";

const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY as string;

export async function fetchPexelsImages(query: string, page = 1): Promise<ImagesPage> {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30&page=${page}`;
    const res = await fetch(url, { headers: { Authorization: PEXELS_KEY } });
    const data = await res.json();

    const images: AppImage[] = data.photos.map((img: any) => ({
        id: `pexels-${img.id}`,
        previewURL: img.src.medium,
        largeImageURL: img.src.original,
        tags: img.alt || "",
        user: img.photographer || "Unknown",
        likes: 0,
        views: 0,
        downloads: 0,
        pageURL: img.url,
        source: "pexels",
    }));

    return {
        images,
        total: images.length,
        nextPage: images.length ? page + 1 : undefined,
    };
}
