export const DELETE_IMAGE = "DELETE_IMAGE";
export const SET_URL = "SET_URL";
export const SET_IMAGES = "SET_IMAGES";
export const SET_IMAGE_HAS_ERROR = "SET_IMAGE_HAS_ERROR";

export const deleteImage = (image) => ({ type: DELETE_IMAGE, payload: image });
export const setImages = (images) => ({ type: SET_IMAGES, payload: images });
export const setUrl = (value) => ({ type: SET_URL, payload: value });
export const setImageHasError = (value) => ({
  type: SET_IMAGE_HAS_ERROR,
  payload: value,
});

export const uploadFile = (file) => (dispatch, getState) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    try {
      const state = getState();
      const images = [...state.images];
      images.push(...JSON.parse(fileReader.result).galleryImages);
      dispatch(setImages(images));
    } catch (e) {
      console.log("Not valid JSON file!");
    }
  };
  if (file !== undefined) fileReader.readAsText(file);
};

export const uploadImage = () => (dispatch, getState) => {
  const { url } = getState();
  if (!url) return;

  const img = new Image();

  img.onload = () => {
    const state = getState();
    const images = [...state.images];
    images.push({
      url,
      width: img.width,
      height: img.height,
    });
    dispatch(setImages(images));
  };

  img.onerror = () => {
    dispatch(setImageHasError(true));
  };

  try {
    img.src = url;
  } catch {
    console.log("Error");
  }
  dispatch(setImageHasError(false));
};

export const previewFile = (file) => (dispatch, getState) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const img = new Image();

    img.onload = () => {
      const state = getState();
      const images = [...state.images];
      images.push({
        url: img.src,
        width: img.width,
        height: img.height,
      });
      dispatch(setImages(images));
    };

    img.onerror = () => {
      console.log("Error onerror");
    };

    try {
      img.src = reader.result;
    } catch {
      console.log("Error");
    }
  };
};
