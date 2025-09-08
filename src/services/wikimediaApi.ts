import { AppImage, ImagesPage } from "../types";

export async function fetchWikimediaImages(query: string, page = 1): Promise<ImagesPage> {
    const limit = 20;
    const offset = (page - 1) * limit;

    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
        query
    )}&gsrnamespace=6&gsrlimit=${limit}&gsroffset=${offset}&prop=imageinfo&iiprop=url|user|extmetadata&iiurlwidth=300&format=json&origin=*`;

    const res = await fetch(url);
    const data = await res.json();

    const pages = data.query?.pages || {};

    const images: AppImage[] = Object.values<any>(pages)
        .filter((img) => img.imageinfo && img.imageinfo.length)
        .map((img: any) => {
            const info = img.imageinfo[0];
            return {
                id: `wikimedia-${img.pageid}`,
                previewURL: info.thumburl || info.url || "",
                largeImageURL: info.url || "",
                pageURL: `https://commons.wikimedia.org/?curid=${img.pageid}`,
                tags: img.title || "",
                type: "photo",
                orientation: "horizontal",
                user: info.user || "Wikimedia",
                likes: 0,
                views: 0,
                downloads: 0,
                source: "wikimedia",
            };
        });

    return {
        images,
        total: images.length,
        nextPage: images.length ? page + 1 : undefined,
    };
}
