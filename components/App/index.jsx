import React, { useState, useRef, useEffect } from "react";

import Control from "../Control/index.jsx";
import Gallery from "../Gallery/index.jsx";
import styles from "./styles.scss";

const App = () => {
  const [images, setImages] = useState([]);
  const galleryContainerRef = useRef(null);
  const [widthContainer, setWidthContainer] = useState(0);

  const handleResize = (width) => {
    setWidthContainer(width);
  };

  useEffect(() => {
    setWidthContainer(galleryContainerRef.current.clientWidth);
    window.addEventListener("resize", () =>
      handleResize(galleryContainerRef.current.clientWidth)
    );

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Control images={images} setImages={setImages} />
      <div className={styles.galleryContainer} ref={galleryContainerRef}>
        {images && widthContainer && (
          <Gallery images={images} widthContainer={widthContainer} />
        )}
      </div>
    </div>
  );
};

export default App;
