import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import Sidebar from "../../components/Sidebar/Sidebar";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import ImageModal from "../../components/ImageModal/ImageModal";

import styles from "./PageLayout.module.css";

const PageLayout = ({
  query,
  setQuery,
  images,
  setSelectedImage,
  history,
  filter,
  setFilter,
  imageType,
  setImageType,
  orientation,
  setOrientation,
  source,
  setSource,
  selectedImage,
  loading,
  message,
  showMore,
}) => {
  return (
    <>
      <div className={styles.animatedBackground}></div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.mainContainer}>
            <Header/>
            <div className={styles.content}>
              <Search query={query} setQuery={setQuery} />

              <div className={styles.filters}>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="popular">Popular</option>
                  <option value="latest">Latest</option>
                </select>

                <select
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
                >
                  <option value="photo">Photo</option>
                  <option value="illustration">Illustration</option>
                  <option value="vector">Vector</option>
                </select>

                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                >
                  <option value="">Any orientation</option>
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>

                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                >
                  <option value="both">Both</option>
                  <option value="pixabay">Pixabay</option>
                  <option value="unsplash">Unsplash</option>
                </select>
              </div>

              {message && <p className={styles.message}>{message}</p>}

              <ImageGallery
                images={images}
                setSelectedImage={setSelectedImage}
                loading={loading}
                showMore={showMore}
              />
            </div>
          </div>
        </div>
        <ImageModal
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </>
  );
};

export default PageLayout;
