import React, { useState, useEffect } from "react";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, setSelectedImage, loading }) => {
  return (
    <div className={styles.gallery}>
      {loading && <div className={styles.loader}></div>}
      {!loading &&
        images.map((image) => (
          <img
            key={image.id}
            src={image.previewURL}
            alt={image.tags}
            onClick={() => setSelectedImage(image.largeImageURL)}
            className={styles.image}
            style={{ cursor: "pointer" }}
          />
        ))}
    </div>
  );
};

export default ImageGallery;