import React, { useState, useEffect } from "react";
import styles from "./ImageModal.module.css";

const ImageModal = ({ selectedImage, setSelectedImage }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedImage) {
      setLoading(true);
    }
  }, [selectedImage]);

  if (!selectedImage) return null;

  return (
    <div className={styles.overlay} onClick={() => setSelectedImage(null)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {loading && <div className={styles.loader}></div>}
        <img
          src={selectedImage}
          alt="Selected"
          className={styles.fullImage}
          onLoad={() => setLoading(false)} 
        />
      </div>
    </div>
  );
};

export default ImageModal;