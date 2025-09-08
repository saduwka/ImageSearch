import { AppImage, ImagesPage } from "../types";

export async function fetchArtImages(query: string, page = 1): Promise<ImagesPage> {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
        query
    )}&limit=30&fields=id,title,image_id,artist_display&page=${page}`;

    const res = await fetch(url);
    const data = await res.json();

    const images: AppImage[] = data.data
        .filter((img: any) => img.image_id) // только с image_id
        .map((img: any): AppImage => ({
            id: `art-${img.id}`,
            previewURL: `https://www.artic.edu/iiif/2/${img.image_id}/full/400,/0/default.jpg`,
            largeImageURL: `https://www.artic.edu/iiif/2/${img.image_id}/full/843,/0/default.jpg`,
            tags: img.title || "",
            user: img.artist_display || "Unknown",
            likes: 0,
            views: 0,
            downloads: 0,
            pageURL: `https://www.artic.edu/artworks/${img.id}`,
            source: "art",
        }));


    return {
        images,
        total: images.length,
        nextPage: images.length ? page + 1 : undefined,
    };
}
