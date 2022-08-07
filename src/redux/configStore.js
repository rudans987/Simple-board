import { configureStore } from "@reduxjs/toolkit";
import comments from "./modules/commentsSlice"; 
import comment from "./modules/commentSlice";
import todo from "./modules/todoSlice";
import todos from "./modules/todosSlice";

const store = configureStore({
  reducer: {
 
    comments,
    comment,
    todo,
    todos
 
  },
});

export default store;
