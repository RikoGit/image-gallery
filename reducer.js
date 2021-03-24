import {
  DELETE_IMAGE,
  SET_IMAGES,
  SET_URL,
  SET_IMAGE_HAS_ERROR,
  IS_LOADED,
} from "./actions.js";

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_IMAGE: {
      const images = [...state.images];
      const index = images.indexOf(payload);
      images.splice(index, 1);

      return {
        ...state,
        images,
      };
    }

    case SET_IMAGES: {
      return {
        ...state,
        images: payload,
      };
    }

    case SET_URL: {
      return {
        ...state,
        url: payload,
      };
    }

    case SET_IMAGE_HAS_ERROR: {
      return {
        ...state,
        imageHasError: payload,
      };
    }

    case IS_LOADED: {
      const images = [...state.images].map((image) => {
        if (image === payload.image) {
          console.log("loading");
          console.log(payload.value);

          return { ...image, isLoaded: payload.value };
        }
        return image;
      });
      return {
        ...state,
        images,
      };
    }

    default:
      return state;
  }
};
