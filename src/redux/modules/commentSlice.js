import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const __getComment = createAsyncThunk(
  "GET_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:5001/comment_list/${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  data: {
    content: "",
    username: "",
    id: 0,
    todoId: 0,
  },
  isLoading: false,
  error: null
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearComment: (state) => {
      state.data.content = "";
    }
  },
  extraReducers: {
    [__getComment.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { clearComment} = commentSlice.actions;
export default commentSlice.reducer;
