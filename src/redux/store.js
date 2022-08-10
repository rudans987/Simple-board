import { combineReducers, configureStore } from "@reduxjs/toolkit";
import comments from "./modules/commentsSlice";
import comment from "./modules/commentSlice";
import thunk from "redux-thunk";
import postSlice from "./modules/postSlice";
const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
  reducer: {
    postSlice: postSlice.reducer,
    comments,
    comment,
  },
  devTools: false,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,

  middleware: [...middlewares],
});

export default store;
