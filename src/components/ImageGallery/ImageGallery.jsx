import React, { useState } from "react";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, setSelectedImage, loading, showMore }) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleShowMore = async () => {
    setLoadingMore(true);
    try {
      await showMore(); // ждём, пока загрузятся новые картинки
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className={styles.gallery}>
      {loading && <div className={styles.loader}></div>}

      {!loading &&
        images.map((image) => (
          <img
            key={image.id}
            src={image.previewURL}
            alt={image.tags}
            onClick={() => setSelectedImage(image)}
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
