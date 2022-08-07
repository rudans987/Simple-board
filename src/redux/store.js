import { combineReducers, configureStore } from "@reduxjs/toolkit";
import comments from "./modules/commentsSlice";
import comment from "./modules/commentSlice";
import thunk from "redux-thunk";
import logger from "redux-logger";
import postSlice from "./modules/postSlice";
const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
  postSlice: postSlice.reducer,
  comments,
  comment,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,

  middleware: [...middlewares, logger],
});

export default store;
