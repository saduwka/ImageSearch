import { AppImage, ImagesPage } from "../types";

export async function fetchNasaImages(query: string, page = 1): Promise<ImagesPage> {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;

    const res = await fetch(url);
    const data = await res.json();

    const images: AppImage[] = data.collection.items.map((item: any) => {
        const info = item.data[0];
        const link = item.links?.[0]?.href || "";

        return {
            id: `nasa-${info.nasa_id}`,
            previewURL: link,
            largeImageURL: link,
            tags: info.keywords?.join(", ") || info.title || "",
            user: "NASA",
            likes: 0,
            views: 0,
            downloads: 0,
            pageURL: `https://images.nasa.gov/details-${info.nasa_id}`,
            source: "nasa",
        };
    });

    return {
        images,
        total: images.length,
        nextPage: images.length ? page + 1 : undefined,
    };
}
