import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    todo: {
      id: 0,
      body: "",
      username: "",
      title: "",
    },
    error: null,
    isLoading: false,
  };
  
  export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
      clearTodo: (state) => {
        state.todo = {
          id: 0,
          body: "",
          username: "",
          title: "",
        };
      },
    },
    extraReducers: {
      
    },
  });
  
  export const { clearTodo } = todoSlice.actions;
  export default todoSlice.reducer;
  