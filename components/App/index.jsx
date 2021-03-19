import React, { useState, useRef, useEffect } from "react";

import Control from "../Control/index.jsx";
import Gallery from "../Gallery/index.jsx";
import styles from "./styles.scss";

const App = () => {
  const [images, setImages] = useState([]);
  const galleryContainerRef = useRef(null);
  const [widthContainer, setWidthContainer] = useState(0);
  useEffect(() => {
    setWidthContainer(galleryContainerRef.current.clientWidth);
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
