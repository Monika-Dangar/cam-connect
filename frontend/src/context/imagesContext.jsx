import { createContext, useContext, useState, useRef } from 'react';

const ImagesContext = createContext();

export const useImagesContext = () => {
  return useContext(ImagesContext);
};

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [favImages, setFavImages] = useState([]);
  const nextCursorRef = useRef(null); // Track nextCursor across renders

  const addImages = (newImages) => {
    setImages((prev) => [...prev, ...newImages]);
  };

  const setFavoriteImages = (images) => {
    setFavImages(images);
  };

  const updateNextCursor = (cursor) => {
    nextCursorRef.current = cursor;
  };

  return (
    <ImagesContext.Provider
      value={{
        images,
        favImages,
        nextCursorRef,
        addImages,
        setFavoriteImages,
        updateNextCursor,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};
