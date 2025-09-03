import React, { useState, useEffect } from "react";
import styles from "./ImageModal.module.css";

const ImageModal = ({ selectedImage, setSelectedImage }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedImage) setLoading(true);
  }, [selectedImage]);

  if (!selectedImage) return null;

  return (
    <div className={styles.overlay} onClick={() => setSelectedImage(null)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* 🔹 Кнопка закрытия */}
        <button
          className={styles.closeBtn}
          onClick={() => setSelectedImage(null)}
        >
          ✖
        </button>

        {loading && <div className={styles.loader}></div>}

        <img
          src={selectedImage.largeImageURL}
          alt={selectedImage.tags}
          className={styles.fullImage}
          onLoad={() => setLoading(false)}
        />

        <div className={styles.info}>
          <p><strong>👤 Author:</strong> {selectedImage.user}</p>
          <p><strong>🏷 Tags:</strong> {selectedImage.tags}</p>
          <p><strong>❤️ Likes:</strong> {selectedImage.likes}</p>
          <p><strong>👀 Views:</strong> {selectedImage.views}</p>
          <p><strong>⬇️ Downloads:</strong> {selectedImage.downloads}</p>

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
