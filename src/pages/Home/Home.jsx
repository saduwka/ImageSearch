import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout/PageLayout";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://pixabay.com/api/";

const Home = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [history, setHistory] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState("popular");
    const [message, setMessage] = useState(""); 

    useEffect(() => {
        
        if (query) {
            fetchImages(query);
        } else {
            fetchRandomImages();
        }
    }, [query, filter]);

    const fetchImages = async (searchTerm) => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    key: API_KEY,
                    q: searchTerm,
                    image_type: "photo",
                    order: filter,
                    per_page: 100
                },
            });
    
            const imagesData = response.data.hits.map(img => ({
                id: img.id,
                previewURL: img.previewURL,
                largeImageURL: img.largeImageURL,
                tags: img.tags,
            }));
    
            if (imagesData.length === 0) {
                setMessage("Nothing found. Try a different search term.");
                setImages([]);
            } else {
                setMessage(`Images found: ${imagesData.length}`);
                setImages(imagesData);
                updateHistory(searchTerm);
            }
        } catch (error) {
            console.error("Error loading images:", error);
            setMessage("Loading error. Check your internet connection.");
        }
    };

    const fetchRandomImages = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    key: API_KEY,
                    image_type: "photo",
                    order: "popular",
                    per_page: 20, 
                },
            });
            setImages(response.data.hits.map(img => ({
                id: img.id,
                previewURL: img.previewURL,
                largeImageURL: img.largeImageURL,
                tags: img.tags,
            })));
        } catch (error) {
            console.error("Error fetching random images:", error);
        }
    };

    const updateHistory = (searchTerm) => {
        setHistory((prev) =>
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
            setFilter={setFilter}
            selectedImage={selectedImage}
            message={message} 
        />
    );
};

export default Home;