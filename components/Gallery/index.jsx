import React from "react";

import styles from "./styles.scss";

const Gallery = ({ images, widthContainer, deleteImage }) => {
  const heightRow = 300;
  let calculatedWidths = images.map(
    (image) => (image.width * heightRow) / image.height
  );
  let numberImagesInRow = 0;
  console.log("app");
  console.log(`widthContainer= ${widthContainer}`);

  calculatedWidths.reduce((acc, width, index) => {
    // eslint-disable-next-line no-param-reassign
    acc += width;
    if (acc >= widthContainer) {
      calculatedWidths = calculatedWidths.map((calculatedWidth, i) => {
        if (i >= numberImagesInRow && i <= index)
          return (calculatedWidth * widthContainer) / acc;

        return calculatedWidth;
      });
      // eslint-disable-next-line no-param-reassign
      acc = 0;
      numberImagesInRow = index + 1;
    }

    return acc;
  }, 0);

  return (
    <ul className={styles.gallery}>
      {images.map((image, index) => (
        <li
          className={styles.gallery__item}
          style={{ width: Math.floor(calculatedWidths[index] * 100) / 100 }}
        >
          <img src={image.url} alt="" className={styles.gallery__image} />
          <button
            type="button"
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
