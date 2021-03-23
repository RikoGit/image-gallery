import React, { useState, useRef, useEffect } from "react";

import Control from "../Control/index.jsx";
import Gallery from "../Gallery/index.jsx";

import styles from "./styles.scss";

const App = () => {
  const [images, setImages] = useState([]);
  const galleryContainerRef = useRef(null);
  const [widthContainer, setWidthContainer] = useState(0);

  const handleResize = () => {
    setWidthContainer(galleryContainerRef.current.clientWidth);
  };

  const deleteImage = (image) => {
    const index = images.indexOf(image);
    const currentImages = [...images];
    currentImages.splice(index, 1);
    setImages(currentImages);
  };

  useEffect(() => {
    setWidthContainer(galleryContainerRef.current.clientWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Control images={images} setImages={setImages} />
      </div>
      <div className={styles.galleryContainer} ref={galleryContainerRef}>
        {images && widthContainer && (
          <Gallery
            images={images}
            widthContainer={widthContainer}
            deleteImage={deleteImage}
          />
        )}
      </div>
    </div>
  );
};

export default App;
