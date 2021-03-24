import React from "react";
import cn from "classnames";

import Image from "../Image/index.jsx";
import styles from "./styles.scss";

const Gallery = ({ images, widthContainer, deleteImage }) => {
  const heightRow = 300;
  let calculatedWidths = images.map(
    (image) => (image.width * heightRow) / image.height
  );
  let indexRowStart = 0;

  calculatedWidths.reduce((acc, width, index) => {
    // eslint-disable-next-line no-param-reassign
    acc += width;
    if (acc >= widthContainer - (index + 1 - indexRowStart) * 10) {
      calculatedWidths = calculatedWidths.map((calculatedWidth, i) => {
        if (i >= indexRowStart && i <= index)
          return (
            (calculatedWidth *
              (widthContainer - (index + 1 - indexRowStart) * 10)) /
            acc
          );

        return calculatedWidth;
      });
      // eslint-disable-next-line no-param-reassign
      acc = 0;
      indexRowStart = index + 1;
    }

    return acc;
  }, 0);

  return (
    <ul className={styles.gallery}>
      {images.map((image, index) => (
        <li
          className={cn(
            styles.gallery__item,
            image.isLoaded && styles.gallery__item_loaded
          )}
          style={{ width: Math.floor(calculatedWidths[index] * 100) / 100 }}
        >
          {console.log("in react")}
          {console.log(image.isLoaded)}
          <Image url={image.url} />
          <button
            type="button"
            aria-label="Delete image"
            className={styles.gallery__delete}
            title="удалить картинку"
            onClick={() => deleteImage(image)}
          >
            &#10005;
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Gallery;
