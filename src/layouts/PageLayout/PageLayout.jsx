import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import Sidebar from "../../components/Sidebar/Sidebar";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import ImageModal from "../../components/ImageModal/ImageModal";

import styles from "./PageLayout.module.css";



const PageLayout = ({ query, setQuery, images, setSelectedImage, history, setFilter, selectedImage, loading, message, showMore }) => {
  return (
      <>
          <div className={styles.animatedBackground}></div>
          <div className={styles.container}>
              {/* <div className={styles.header}>
                  <Header setFilter={setFilter} />
              </div> */}
              <div className={styles.wrapper}>
                  <div className={styles.mainContainer}>
                      <div className={styles.sidebar}>
                          <Sidebar history={history} setQuery={setQuery} />
                      </div>
                      <div className={styles.content}>
                          <Search query={query} setQuery={setQuery} />
                          {message && <p className={styles.message}>{message}</p>}
                          
                          <ImageGallery images={images} setSelectedImage={setSelectedImage} loading={loading} showMore={showMore} />
                          

                      </div>
                  </div>
              </div>
              <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          </div>
      </>
  );
};

export default PageLayout;