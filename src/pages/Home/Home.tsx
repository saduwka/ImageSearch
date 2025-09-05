import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout/PageLayout";
import { AppImage } from "../../types";

const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY as string;
const PIXABAY_URL = "https://pixabay.com/api/";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY as string;
const UNSPLASH_URL = "https://api.unsplash.com/search/photos";

const Home = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState<AppImage[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<AppImage | null>(null);

    const [filter, setFilter] = useState("popular");
    const [imageType, setImageType] = useState("photo");
    const [orientation, setOrientation] = useState("");
    const [source, setSource] = useState("both");

    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        setPage(1);
        setImages([]);
        if (query) {
            fetchImages(query, 1);
        } else {
            fetchRandomImages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, filter, imageType, orientation, source]);

    const showMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchImages(query, nextPage);
    };

    const normalizeImageData = (img: any, from: "pixabay" | "unsplash"): AppImage => {
        let user = "Unknown";
        if (from === "pixabay") user = img.user || "Unknown";
        if (from === "unsplash")
            user = (img.user && (img.user.name || img.user.username)) || "Unknown";

        const tags = img.tags || img.alt_description || "";

        return {
            id: `${from}-${img.id}`,
            previewURL: img.previewURL || img.urls?.small || "",
            largeImageURL: img.largeImageURL || img.urls?.full || "",
            tags,
            user,
            likes: img.likes || 0,
            views: img.views || 0,
            downloads: img.downloads || 0,
            pageURL: img.pageURL || img.links?.html || "",
            source: from,
        };
    };

    const fetchPixabayImages = async (
        searchTerm: string,
        pageNumber = 1
): Promise<{ images: AppImage[]; total: number }> => {
        try {
            const res = await axios.get(PIXABAY_URL, {
                params: {
                    key: PIXABAY_KEY,
                    q: searchTerm,
                    image_type: imageType,
                    order: filter,
                    orientation: orientation || undefined,
                    per_page: 20,
                    page: pageNumber,
                },
            });
            return {
                images: res.data.hits.map((img: any) => normalizeImageData(img, "pixabay")),
                total: res.data.totalHits,
            };
        } catch (err) {
            console.error("Pixabay error:", err);
            return { images: [], total: 0 };
        }
    };

    const fetchUnsplashImages = async (
        searchTerm: string,
        pageNumber = 1
): Promise<{ images: AppImage[]; total: number }> => {
        try {
            const res = await axios.get(UNSPLASH_URL, {
                params: {
                    query: searchTerm,
                    page: pageNumber,
                    per_page: 20,
                    orientation: orientation || undefined,
                    client_id: UNSPLASH_KEY,
                },
            });
            return {
                images: res.data.results.map((img: any) =>
                    normalizeImageData(img, "unsplash")
                ),
                total: res.data.total,
            };
        } catch (err) {
            console.error("Unsplash error:", err);
            return { images: [], total: 0 };
        }
    };

    const fetchImages = async (searchTerm: string, pageNumber = 1) => {
        let pixabayData = { images: [] as AppImage[], total: 0 };
        let unsplashData = { images: [] as AppImage[], total: 0 };

        if (source === "pixabay" || source === "both") {
            pixabayData = await fetchPixabayImages(searchTerm, pageNumber);
        }
        if (source === "unsplash" || source === "both") {
            unsplashData = await fetchUnsplashImages(searchTerm, pageNumber);
        }

        const combined = [...pixabayData.images, ...unsplashData.images];
        const totalCount = pixabayData.total + unsplashData.total;

        if (combined.length === 0 && pageNumber === 1) {
            setMessage("Nothing found. Try a different search term.");
            setImages([]);
            setTotal(0);
        } else if (pageNumber === 1) {
            setImages(combined);
            setTotal(totalCount);
            setMessage(`Images found: ${totalCount} (showing ${combined.length})`);
            updateHistory(searchTerm);
        } else {
            setImages((prev) => [...prev, ...combined]);
            setMessage(
                `Images found: ${total} (showing ${combined.length + images.length})`
            );
        }
    };

    const fetchRandomImages = async () => {
        await fetchImages("nature", 1);
    };

    const updateHistory = (searchTerm: string) => {
        setHistory((prev) =>
            prev.includes(searchTerm) ? prev : [searchTerm, ...prev.slice(0, 4)]
        );
    };

    return (
        <PageLayout
            query={query}
            setQuery={setQuery}
            images={images}
            setSelectedImage={setSelectedImage}
            filter={filter}
            setFilter={setFilter}
            imageType={imageType}
            setImageType={setImageType}
            orientation={orientation}
            setOrientation={setOrientation}
            source={source}
            setSource={setSource}
            selectedImage={selectedImage}
            message={message}
            showMore={showMore}
            loading={false}
        />
    );
};

export default Home;
