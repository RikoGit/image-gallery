import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer.js";

const state = { url: "", images: [], imageHasError: false };

export default createStore(reducer, state, applyMiddleware(thunk));
