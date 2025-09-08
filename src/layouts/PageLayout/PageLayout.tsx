import { memo, useState } from "react";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import ImageModal from "../../components/ImageModal/ImageModal";
import Loader from "../../components/Loader/Loader"; // <- обязательно импортировать

import styles from "./PageLayout.module.css";
import { AppImage, SourceFilter } from "../../types";

interface FiltersProps {
    filter: string;
    setFilter: (value: string) => void;
    imageType: string;
    setImageType: (value: string) => void;
    orientation: string;
    setOrientation: (value: string) => void;
    source: SourceFilter;
    setSource: (value: SourceFilter) => void;
}

const Filters = memo(
    ({
         filter,
         setFilter,
         imageType,
         setImageType,
         orientation,
         setOrientation,
         source,
         setSource,
     }: FiltersProps) => (
        <div className={styles.filters}>
            {/*<select value={filter} onChange={(e) => setFilter(e.target.value)}>*/}
            {/*    <option value="popular">Popular</option>*/}
            {/*    <option value="latest">Latest</option>*/}
            {/*</select>*/}
            {/*<select value={imageType} onChange={(e) => setImageType(e.target.value)}>*/}
            {/*    <option value="photo">Photo</option>*/}
            {/*    <option value="illustration">Illustration</option>*/}
            {/*    <option value="vector">Vector</option>*/}
            {/*</select>*/}
            {/*<select value={orientation} onChange={(e) => setOrientation(e.target.value)}>*/}
            {/*    <option value="">Any orientation</option>*/}
            {/*    <option value="horizontal">Horizontal</option>*/}
            {/*    <option value="vertical">Vertical</option>*/}
            {/*</select>*/}
            <select value={source} onChange={(e) => setSource(e.target.value as SourceFilter)}>
                <option value="both">Both</option>
                <option value="pixabay">Pixabay</option>
                <option value="unsplash">Unsplash</option>
                <option value="pexels">Pexels</option>
                <option value="wikimedia">Wikimedia</option>
            </select>
        </div>
    )
);

Filters.displayName = "Filters";

interface PageLayoutProps {
    query: string;
    setQuery: (value: string) => void;
    images: AppImage[];
    setSelectedImage: (image: AppImage | null) => void;
    filter: string;
    setFilter: (value: string) => void;
    imageType: string;
    setImageType: (value: string) => void;
    orientation: string;
    setOrientation: (value: string) => void;
    source: SourceFilter;
    setSource: (value: SourceFilter) => void;
    selectedImage: AppImage | null;
    loading: boolean;
    loadingMore: boolean;
    message?: string;
    showMore: () => Promise<void>;
    hasMore: boolean;
}

const PageLayout = ({
                        query,
                        setQuery,
                        images,
                        filter,
                        setFilter,
                        imageType,
                        setImageType,
                        orientation,
                        setOrientation,
                        source,
                        setSource,
                        loading,
                        loadingMore,
                        message,
                        showMore,
                        hasMore,
                    }: PageLayoutProps) => {
    const [selectedImage, setSelectedImage] = useState<AppImage | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    return (
        <main>
            <div className={styles.animatedBackground} />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.mainContainer}>
                        <Header />
                        <section className={styles.content}>
                            <Search query={query} setQuery={setQuery} />
                            <Filters
                                filter={filter}
                                setFilter={setFilter}
                                imageType={imageType}
                                setImageType={setImageType}
                                orientation={orientation}
                                setOrientation={setOrientation}
                                source={source}
                                setSource={setSource}
                            />

                            {message && <p className={styles.message}>{message}</p>}

                            {loading && <Loader />} {/* Показываем спиннер */}

                            <ImageGallery
                                images={images}
                                loading={loading}
                                loadingMore={loadingMore} // 🔹 новый проп
                                hasMore={hasMore}
                                showMore={showMore}
                                setSelectedImage={(image, index) => {
                                    setSelectedImage(image);
                                    setSelectedImageIndex(index);
                                }}
                            />

                        </section>
                    </div>
                </div>

                {selectedImage && (
                    <ImageModal
                        images={images}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        selectedImageIndex={selectedImageIndex}
                        setSelectedImageIndex={setSelectedImageIndex}
                    />
                )}
            </div>
        </main>
    );
};

export default memo(PageLayout);
