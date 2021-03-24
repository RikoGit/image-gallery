import {
  DELETE_IMAGE,
  SET_IMAGES,
  SET_URL,
  SET_IMAGE_HAS_ERROR,
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

    default:
      return state;
  }
};
