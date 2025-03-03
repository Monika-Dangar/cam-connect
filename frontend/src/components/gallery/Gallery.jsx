import { useEffect, useState, useRef } from 'react';
import '../../css/gallery/gallery.css';
import '../../css/drawer/drawer.css';
import ImageCard from './ImageCard';
import AnchorTemporaryDrawer from '../drawer/Drawer';
import { getAllImages, getFavoriteImages } from '../../services/galleryServices';
import LoadingSpinner from '../loader/Loader';
import { useImagesContext } from '../../context/imagesContext'; // Import context

const Gallery = () => {
  const { images, favImages, nextCursorRef, addImages, setFavoriteImages, updateNextCursor } =
    useImagesContext();
  const [toggleFav, setToggleFav] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const galleryRef = useRef(null); // Reference for gallery container

  // Fetch all images
  const fetchImages = async () => {
    if (!toggleFav) {
      setIsLoading(true); // Show loading spinner when fetching images

      // Fetch images based on the current cursor
      const response = await getAllImages([], [], null, null, nextCursorRef.current);

      if (response) {
        console.log(response);

        // Ensure uniqueness by using a Map
        const uniqueImagesMap = new Map();
        response?.response.imageData.forEach((img) => {
          uniqueImagesMap.set(img._id, img); // Store each image by its _id
        });

        // Convert the Map to an array of unique images
        const uniqueImages = Array.from(uniqueImagesMap.values());

        // Update the images state in context
        addImages(uniqueImages);

        // Update nextCursorRef for pagination
        updateNextCursor(response.response.nextCursor);

        // Hide the loading spinner after fetching images
        setIsLoading(false);
      }
    }
  };

  // Fetch favorite images
  const fetchFavoriteImages = async () => {
    setIsLoading(true); // Set loading to true while fetching favorites
    const response = await getFavoriteImages();
    if (response) {
      setFavoriteImages(response); // Update favorite images in context
      setIsLoading(false); // Hide loading spinner after favorites are fetched
    }
  };

  // UseEffect to trigger fetch when toggleFav changes
  useEffect(() => {
    // If toggling to show favorites, fetch favorites
    if (toggleFav) {
      fetchFavoriteImages();
    } else {
      fetchImages(); // If toggling to show all images, fetch all images
    }
  }, [toggleFav, fetchAgain]); // Re-run when toggleFav or fetchAgain changes

  const handelInfiniteScroll = async () => {
    try {
      const galleryElement = galleryRef.current;

      // Ensure the galleryRef is set and the element is present
      if (
        galleryElement &&
        galleryElement.scrollHeight === galleryElement.scrollTop + galleryElement.clientHeight &&
        !isLoading
      ) {
        fetchImages(); // Fetch more images when scrolling to the bottom
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const galleryElement = galleryRef.current;

    if (galleryElement) {
      galleryElement.addEventListener('scroll', handelInfiniteScroll);
    }

    // Cleanup on component unmount
    return () => {
      if (galleryElement) {
        galleryElement.removeEventListener('scroll', handelInfiniteScroll);
      }
    };
  }, [isLoading]); // Only rerun when isLoading changes

  const handleGetFavoriteImages = async () => {
    // Toggle favorite view
    setToggleFav((prev) => !prev); // This will toggle the state between showing favorites and showing all images
    setFetchAgain((prev) => !prev); // Trigger re-fetch when toggled
  };

  const setFilteredImages = (filteredData) => {
    setFavoriteImages(filteredData); // Only for the favorites
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div className="drawerContainer">
        <AnchorTemporaryDrawer setFilteredImages={setFilteredImages} />
        <button
          onClick={handleGetFavoriteImages}
          className={`favoriteContainer ${toggleFav ? 'active' : ''}`}
        >
          Favorites
        </button>
      </div>
      <div
        className="imageGallery"
        ref={galleryRef}
        style={{ overflowY: 'auto', height: '100vh' }} // Set fixed height and overflow to enable scrolling
      >
        {toggleFav
          ? favImages.length > 0
            ? favImages.map((fav) => (
                <ImageCard key={fav._id} imgDetails={fav} type={'FavImages'} favDetails={images} />
              ))
            : null
          : images.length > 0
          ? images.map((img) => (
              <ImageCard
                key={img._id}
                imgDetails={img}
                type={'AllImages'}
                favDetails={favImages}
                setFetchAgain={setFetchAgain}
              />
            ))
          : null}
        {isLoading && <LoadingSpinner isLoading={isLoading} />}
      </div>
    </>
  );
};

export default Gallery;
