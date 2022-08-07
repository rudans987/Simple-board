import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import postSlice from "./modules/postSlice";
const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
  postSlice: postSlice.reducer,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares, logger],
});

export default store;
