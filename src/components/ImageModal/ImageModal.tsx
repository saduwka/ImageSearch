import { useState, useEffect } from "react";
import styles from "./ImageModal.module.css";
import { AppImage } from "../../types";

interface Props {
    selectedImage: AppImage | null;
    setSelectedImage: (image: AppImage | null) => void;
    images: AppImage[];
    selectedImageIndex: number;
    setSelectedImageIndex: (index: number) => void;
}

const ImageModal = ({
                        selectedImage,
                        setSelectedImage,
                        images,
                        selectedImageIndex,
                        setSelectedImageIndex,
                    }: Props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (selectedImage) setLoading(true);
    }, [selectedImage]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!selectedImage) return;
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "Escape") setSelectedImage(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedImage, selectedImageIndex]);

    if (!selectedImage) return null;

    const showPrev = () => {
        const newIndex = (selectedImageIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex]);
        setSelectedImageIndex(newIndex);
    };

    const showNext = () => {
        const newIndex = (selectedImageIndex + 1) % images.length;
        setSelectedImage(images[newIndex]);
        setSelectedImageIndex(newIndex);
    };

    return (
        <div className={styles.overlay} onClick={() => setSelectedImage(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* 🔹 Кнопка закрытия */}
                <button
                    className={styles.closeBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                    }}
                >
                    ✖
                </button>

                {/* 🔹 Стрелки для десктопа */}
                <button
                    className={styles.prevBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        showPrev();
                    }}
                >
                    ‹
                </button>

                <button
                    className={styles.nextBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        showNext();
                    }}
                >
                    ›
                </button>

                {/* 🔹 Невидимые зоны для мобилки */}
                <div
                    className={`${styles.mobileZone} ${styles.leftZone}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        showPrev();
                    }}
                />
                <div
                    className={`${styles.mobileZone} ${styles.rightZone}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        showNext();
                    }}
                />

                {/* 🔹 Обертка для картинки + лоадер */}
                <div className={styles.imageWrapper}>
                    {loading && <div className={styles.loader}></div>}

                    <img
                        src={selectedImage.largeImageURL}
                        alt={selectedImage.tags}
                        className={`${styles.fullImage} ${
                            !loading ? styles.loaded : ""
                        }`}
                        onLoad={() => setLoading(false)}
                    />
                </div>

                {/* 🔹 Инфа */}
                <div className={styles.info}>
                    <p>
                        <strong>👤 Author:</strong> {selectedImage.user}
                    </p>
                    <p>
                        <strong>🏷 Tags:</strong> {selectedImage.tags}
                    </p>
                    <p>
                        <strong>❤️ Likes:</strong> {selectedImage.likes}
                    </p>
                    <p>
                        <strong>👀 Views:</strong> {selectedImage.views}
                    </p>
                    <p>
                        <strong>⬇️ Downloads:</strong> {selectedImage.downloads}
                    </p>

                    <div className={styles.buttons}>
                        <a
                            href={selectedImage.largeImageURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.downloadBtn}
                        >
                            ⬇️ Download
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
