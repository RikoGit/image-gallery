import React from "react";
import cn from "classnames";

import styles from "./styles.scss";

const Image = ({ url }) => (
  <img src={url} alt="" className={cn(styles.gallery__image)} />
);

export default Image;
