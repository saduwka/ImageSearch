const API_KEY = import.meta.env.VITE_API_KEY;

const getImages = async () => {
  axios
    .get(
      `
            https://pixabay.com/api/?key=${API_KEY}&q=${"car"}&image_type=photo
        `
    )
    .then((response) => {
      const data = response.data;

      return data.hits;
    })
    .catch((e) => {});
  console.log(images);
};

export default getImages;
