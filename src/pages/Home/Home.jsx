import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout/PageLayout";

const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;
const PIXABAY_URL = "https://pixabay.com/api/";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const UNSPLASH_URL = "https://api.unsplash.com/search/photos";

const Home = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [filter, setFilter] = useState("popular"); 
  const [imageType, setImageType] = useState("photo"); 
  const [orientation, setOrientation] = useState(""); 
  const [source, setSource] = useState("both"); 

  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
        setImages([]);
        if (query) {
            fetchImages(query, 1);
        } else {
            fetchRandomImages();
        }
    }, [query, filter, imageType, orientation, source]);


    const showMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);

        // ждем загрузку
        await fetchImages(query, nextPage);
    };

const normalizeImageData = (img, from) => {
  let user = "Unknown";
  if (from === "pixabay") user = img.user || "Unknown";
  if (from === "unsplash") user = (img.user && (img.user.name || img.user.username)) || "Unknown";

  const tags = img.tags || img.alt_description || "";

  return {
    id: `${from}-${img.id}`,
    previewURL: img.previewURL || img.urls?.small || "",
    largeImageURL: img.largeImageURL || img.urls?.full || "",
    tags,
    user,
    likes: img.likes || 0,
    views: img.views || 0,
    downloads: img.downloads || 0,
    pageURL: img.pageURL || img.links?.html || "",
    source: from
  };
};


  const fetchPixabayImages = async (searchTerm, pageNumber = 1) => {
    try {
      const res = await axios.get(PIXABAY_URL, {
        params: {
          key: PIXABAY_KEY,
          q: searchTerm,
          image_type: imageType,
          order: filter,
          orientation: orientation || undefined,
          per_page: 20,
          page: pageNumber,
        },
      });
      return res.data.hits.map(img => normalizeImageData(img, "pixabay"));
    } catch (err) {
      console.error("Pixabay error:", err);
      return [];
    }
  };

  const fetchUnsplashImages = async (searchTerm, pageNumber = 1) => {
    try {
      const res = await axios.get(UNSPLASH_URL, {
        params: {
          query: searchTerm,
          page: pageNumber,
          per_page: 20,
          orientation: orientation || undefined,
          client_id: UNSPLASH_KEY,
        },
      });
      return res.data.results.map(img => normalizeImageData(img, "unsplash"));
    } catch (err) {
      console.error("Unsplash error:", err);
      return [];
    }
  };

  const fetchImages = async (searchTerm, pageNumber = 1) => {
    let pixabayData = [];
    let unsplashData = [];

    if (source === "pixabay" || source === "both") {
      pixabayData = await fetchPixabayImages(searchTerm, pageNumber);
    }
    if (source === "unsplash" || source === "both") {
      unsplashData = await fetchUnsplashImages(searchTerm, pageNumber);
    }

    const combined = [...pixabayData, ...unsplashData];

    if (combined.length === 0 && pageNumber === 1) {
      setMessage("Nothing found. Try a different search term.");
      setImages([]);
    } else if (pageNumber === 1) {
        setMessage(`Images found: ${combined.length}`);
        setImages(combined); // просто заменяем, не добавляем
        updateHistory(searchTerm);
        } else {
        setImages(prev => [...prev, ...combined]); // show more добавляет
    }

  };

  const fetchRandomImages = async () => {
    await fetchImages("nature", 1);
  };

  const updateHistory = (searchTerm) => {
    setHistory(prev =>
      prev.includes(searchTerm) ? prev : [searchTerm, ...prev.slice(0, 4)]
    );
  };

  return (
    <PageLayout
      query={query}
      setQuery={setQuery}
      images={images}
      setSelectedImage={setSelectedImage}
      history={history}
      filter={filter}
      setFilter={setFilter}
      imageType={imageType}
      setImageType={setImageType}
      orientation={orientation}
      setOrientation={setOrientation}
      source={source}
      setSource={setSource}
      selectedImage={selectedImage}
      message={message}
      showMore={showMore}
    />
  );
};

export default Home;
