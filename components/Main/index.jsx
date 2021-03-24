import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import Control from "../Control/index.jsx";
import Gallery from "../Gallery/index.jsx";

import {
  deleteImage,
  setUrl,
  setImages,
  uploadFile,
  uploadImage,
  previewFile,
} from "../../actions.js";

import styles from "./styles.scss";

const Main = ({
  images,
  url,
  imageHasError,
  dispatchSetImages,
  dispatchSetUrl,
  dispatchUploadFile,
  dispatchDeleteImage,
  dispatchUploadImage,
  dispatchPreviewFile,
}) => {
  const galleryContainerRef = useRef(null);
  const [widthContainer, setWidthContainer] = useState(0);

  const handleResize = () => {
    setWidthContainer(galleryContainerRef.current.clientWidth);
  };

  useEffect(() => {
    setWidthContainer(galleryContainerRef.current.clientWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Control
          images={images}
          url={url}
          imageHasError={imageHasError}
          setImages={dispatchSetImages}
          setUrl={dispatchSetUrl}
          uploadFile={dispatchUploadFile}
          uploadImage={dispatchUploadImage}
          previewFile={dispatchPreviewFile}
        />
      </div>
      <div className={styles.galleryContainer} ref={galleryContainerRef}>
        {images && widthContainer && (
          <Gallery
            images={images}
            widthContainer={widthContainer}
            deleteImage={dispatchDeleteImage}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  dispatchDeleteImage: deleteImage,
  dispatchUploadImage: uploadImage,
  dispatchUploadFile: uploadFile,
  dispatchPreviewFile: previewFile,
  dispatchSetImages: setImages,
  dispatchSetUrl: setUrl,
})(Main);
