import { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout";
import { AppImage, SourceFilter } from "../../types";
import { fetchAllImages } from "../../services/allApis";

const Home = () => {
    const [query, setQuery] = useState("");
    const [selectedImage, setSelectedImage] = useState<AppImage | null>(null);
    const [source, setSource] = useState<SourceFilter>("both");
    const [filter, setFilter] = useState("popular");
    const [imageType, setImageType] = useState("photo");
    const [orientation, setOrientation] = useState("");
    const [message, setMessage] = useState("");
    const [images, setImages] = useState<AppImage[]>([]);
    const [loading, setLoading] = useState(false);      // Центральный спиннер
    const [loadingMore, setLoadingMore] = useState(false); // Лоадер внизу
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const searchImages = async (nextPage = 1, append = false) => {
        if (!query || (!hasMore && append)) return;

        append ? setLoadingMore(true) : setLoading(true);

        try {
            const data = await fetchAllImages({
                query,
                source: source === "both" ? undefined : source,
                page: nextPage,
                filter,
                imageType,
                orientation,
            });

            if (append) {
                setImages(prev => [...prev, ...data.images]);
            } else {
                setImages(data.images);
            }

            setPage(nextPage);
            setHasMore(data.images.length > 0);

            setMessage(`Found: ${append ? images.length + data.images.length : data.images.length} images`);
        } catch (err) {
            console.error(err);
            setMessage("Error fetching images. Please try again later.");
        } finally {
            append ? setLoadingMore(false) : setLoading(false);
        }
    };

    // Первая загрузка или при изменении query / фильтров
    useEffect(() => {
        setHasMore(true);
        searchImages(1);
    }, [query, source, filter, imageType, orientation]);

    // Обработчик кнопки "Show More"
    const handleShowMore = async () => {
        if (!hasMore || loadingMore) return;
        await searchImages(page + 1, true);
    };

    return (
        <PageLayout
            query={query}
            setQuery={setQuery}
            images={images}
            setSelectedImage={setSelectedImage}
            source={source}
            setSource={setSource}
            filter={filter}
            setFilter={setFilter}
            imageType={imageType}
            setImageType={setImageType}
            orientation={orientation}
            setOrientation={setOrientation}
            selectedImage={selectedImage}
            loading={loading}
            loadingMore={loadingMore}
            message={message}
            showMore={handleShowMore}
            hasMore={hasMore}
        />
    );
};

export default Home;
