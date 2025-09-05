import { useState } from "react";
import styles from "./ImageGallery.module.css";
import { AppImage } from "../../types";

interface Props {
    images: AppImage[];
    setSelectedImage: (image: AppImage, index: number) => void; // 🔹 теперь принимаем image + index
    loading: boolean;
    showMore: () => Promise<void>;
}

const ImageGallery = ({ images, setSelectedImage, loading, showMore }: Props) => {
    const [loadingMore, setLoadingMore] = useState(false);

    const handleShowMore = async () => {
        setLoadingMore(true);
        try {
            await showMore();
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <div className={styles.gallery}>
            {loading && <div className={styles.loader}></div>}

            {!loading &&
                images.map((image, index) => (
                    <img
                        key={image.id}
                        src={image.previewURL}
                        alt={image.tags}
                        onClick={() => setSelectedImage(image, index)} // 🔹 передаём индекс
                        className={styles.image}
                        style={{ cursor: "pointer" }}
                    />
                ))}

            {images.length > 0 && (
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
