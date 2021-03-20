import React, { useState } from "react";
import cn from "classnames";

import styles from "./styles.scss";

const Control = ({ images, setImages }) => {
  const [url, setUrl] = useState("");
  // const [imageIsLoaded, setImageIsLoaded] = useState(null);
  const [imageHasError, setImageHasError] = useState(null);
  const currentImages = [...images];

  const img = new Image();
  img.crossOrigin = "anonymous";

  const uploadImage = () => {
    if (!url) return;

    img.onload = () => {
      const image = {
        url,
        width: img.width,
        height: img.height,
      };
      currentImages.push(image);
      setImages(currentImages);
      // setImageIsLoaded(true);
    };

    img.onerror = () => {
      setImageHasError(true);
    };

    try {
      img.src = url;
    } catch {
      console.log("Error");
    }
    // setImageIsLoaded(false);
    setImageHasError(false);
  };

  const uploadFile = (file) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      try {
        currentImages.push(...JSON.parse(fileReader.result).galleryImages);
        setImages(currentImages);
        console.log("add");
        console.log(images);
      } catch (e) {
        console.log("Not valid JSON file!");
      }
    };
    if (file !== undefined) fileReader.readAsText(file);
  };

  return (
    <div className={styles.control}>
      <label
        className={cn(
          styles.control__label,
          imageHasError && styles.control__label_error
        )}
      >
        <input
          className={styles.control__input}
          type="text"
          placeholder="Введите url"
          onChange={(event) => setUrl(event.target.value)}
        />
        <span className={styles.control__error}>
          ошибка при загрузке картинки
        </span>
      </label>
      <button
        type="button"
        onClick={uploadImage}
        className={cn(
          styles.control__button,
          styles.control__button_type_search
        )}
      >
        {" "}
      </button>
      <label
        className={cn(
          styles.control__button,
          styles.control__button_type_fileupload
        )}
        onChange={(event) => uploadFile(event.target.files[0])}
      >
        JSON
        <input type="file" className={styles.control__file} />
      </label>
    </div>
  );
};

export default Control;
