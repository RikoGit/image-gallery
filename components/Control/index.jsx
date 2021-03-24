import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";

import styles from "./styles.scss";

const Control = ({
  url,
  imageHasError,
  setUrl,
  uploadImage,
  uploadFile,
  previewFile,
}) => {
  const dropareaRef = useRef(null);
  const dropareaFileRef = useRef(null);
  const [isHighlight, setIsHighlight] = useState(false);

  const handleFiles = (files) => {
    [...files].forEach(previewFile);
  };
  const handleDrop = (event) => {
    const { dataTransfer } = event;
    const { files } = dataTransfer;
    handleFiles(files);
  };

  useEffect(() => {
    const dropArea = dropareaRef.current;
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    ["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
      dropArea.addEventListener(event, preventDefaults, false);
    });
    ["dragenter", "dragover"].forEach((event) => {
      dropArea.addEventListener(event, () => setIsHighlight(true), false);
    });
    ["dragleave", "drop"].forEach((event) => {
      dropArea.addEventListener(event, () => setIsHighlight(false), false);
    });
    dropArea.addEventListener("drop", handleDrop, false);
  }, []);

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
          value={url}
          placeholder="Введите url"
          onChange={(event) => setUrl(event.target.value)}
        />
        <span className={styles.control__error}>
          ошибка при загрузке картинки
        </span>
      </label>
      <button
        type="button"
        aria-label="Upload image"
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

      <div
        className={cn(
          styles.droparea,
          isHighlight && styles.droparea_highlight
        )}
        ref={dropareaRef}
        title="перенесите одно или несколько изображений в пунктирную область"
      >
        <form className={styles.droparea__form}>
          <label
            className={cn(
              styles.control__button,
              styles.control__button_type_fileupload
            )}
          >
            <input
              type="file"
              ref={dropareaFileRef}
              className={styles.droparea__file}
              multiple
              onChange={() => handleFiles(dropareaFileRef.current.files)}
              accept="image/*"
            />
            IMG
          </label>
        </form>
      </div>
    </div>
  );
};

export default Control;
