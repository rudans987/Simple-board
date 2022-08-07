import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";





const initialState = {
  data: [
    {
    id:3,
    writer:"영희",
    title: "math",
    content: "미분적분"
  },
  {
    id:4,
    writer:"철수",
    title: "science",
    content: "아인슈타인의 상대성이론"
  },
],
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
  
  },
  extraReducers: {
  
  },
});

export const { clearTodo } = todoSlice.actions;
export default todoSlice.reducer;
