import styles from "./ImageGallery.module.css";
import { AppImage } from "../../types";

interface Props {
    images: AppImage[];
    setSelectedImage: (image: AppImage, index: number) => void;
    loading: boolean;
    loadingMore: boolean; // используем проп
    showMore: () => Promise<void>;
    hasMore: boolean;
}

const ImageGallery = ({ images, setSelectedImage, loading, loadingMore, showMore, hasMore }: Props) => {
    const handleShowMore = async () => {
        if (!loadingMore) {
            await showMore(); // подгрузка новых изображений
        }
    };

    return (
        <div className={styles.gallery}>
            {/* Центральный лоадер */}
            {loading && <div className={styles.loader}></div>}

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
            {hasMore && (
                <button
                    className={styles.showMore}
                    onClick={handleShowMore}
                    disabled={loadingMore}
                >
                    {loadingMore ? <div className={styles.loaderSmall}></div> : "Show More"}
                </button>
            )}
        </div>
    );
};

export default ImageGallery;
