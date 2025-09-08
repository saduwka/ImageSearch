import { AppImage, ImagesPage } from "../types";

const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY as string;

export async function fetchPixabayImages(query: string, page = 1): Promise<ImagesPage> {
    const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(
        query
    )}&image_type=photo&per_page=30&page=${page}`;

    const res = await fetch(url);
    const data = await res.json();

    const images: AppImage[] = data.hits.map((img: any) => ({
        id: `pixabay-${img.id}`,
        previewURL: img.previewURL,
        largeImageURL: img.largeImageURL,
        tags: img.tags || "",
        user: img.user || "Unknown",
        likes: img.likes || 0,
        views: img.views || 0,
        downloads: img.downloads || 0,
        pageURL: img.pageURL || "",
        source: "pixabay",
    }));

    return {
        images,
        total: images.length,
        nextPage: images.length ? page + 1 : undefined,
    };
}
