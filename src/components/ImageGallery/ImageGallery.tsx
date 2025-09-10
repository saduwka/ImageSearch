import styles from "./ImageGallery.module.css";
import { AppImage } from "../../types";

interface Props {
    images: AppImage[];
    setSelectedImage: (image: AppImage, index: number) => void;
    loading: boolean;
    loadingMore: boolean; // используем проп
    showMore: () => Promise<void>;
    hasMore: boolean;
    message?: string;
}

const ImageGallery = ({ images, setSelectedImage, loading, loadingMore, showMore, hasMore, message }: Props) => {
    const handleShowMore = async () => {
        if (!loadingMore) {
            await showMore();
        }
    };

    return (
        <div className={styles.gallery}>
            {/* Центральный лоадер */}
            <div className={styles.counter}>
                {message && <p className={styles.message}>{message}</p>}
            </div>

            {loading && <div className={styles.loader}></div>}

            <div className={styles.content}>
                {/* Галерея */}
                {!loading &&
                    images.map((image, index) => (
                        <img
                            key={image.id}
                            src={image.previewURL}
                            alt={image.tags}
                            onClick={() => setSelectedImage(image, index)}
                            className={styles.image}
                            style={{ cursor: "pointer" }}
                        />
                    ))}

                {/* Кнопка подгрузки */}
                {images.length > 0 && hasMore && (
                    <button
                        className={styles.showMore}
                        onClick={handleShowMore}
                        disabled={loadingMore}
                    >
                        {loadingMore ? <div className={styles.loaderSmall}></div> : "Show More"}
                    </button>
                )}
            </div>

        </div>
    );
};

export default ImageGallery;
