import React from "react";

import styles from "./styles.scss";

const Gallery = ({ images, widthContainer }) => {
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
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <img src={image.url} alt="" width={calculatedWidths[index]} />
      ))}
    </div>
  );
};

export default Gallery;
