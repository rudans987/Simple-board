import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
  BASE2: process.env.REACT_APP_BASE_URI2,
};

// 게시글 리스트
export const __getPostList = createAsyncThunk("GET_POSTS", async () => {
  const response = await axios.get(`${URI.BASE2}`);
  // 전체 포스트 리스트
  return response.data;
});

//게시글 등록
export const __addPost = createAsyncThunk("ADD_POST", async (new_post_list) => {
  const response = await axios.post(`${URI.BASE2}`, new_post_list);
  // 전체 포스트 리스트
  return response.data;
});

// 게시글 삭제
export const __deletePost = createAsyncThunk("DELETE_POST", async (postId) => {
  const response = await axios.delete(`${URI.BASE2}/${postId}`);
  // 포스트 아이디
  return postId;
});

//게시글 수정
export const __updatePost = createAsyncThunk(
  "UPDATE_POST",
  async ({ id, writer, title, contents }) => {
    const response = await axios.put(`${URI.BASE2}/${id}`, {
      id: id,
      writer: writer,
      title: title,
      contents: contents,
    });

    return { id, writer, title, contents };
  }
);

// 무한 스크롤을 위해 게시물을 5개씩 가져오기
export const __getPostCount = createAsyncThunk(
  "GET_POST_COUNT",
  async ({ pageCurrent, itemCount }, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100)); //기다려준다.
      const response = await axios.get(
        `${URI.BASE2}?_page=${pageCurrent}&_limit=${itemCount}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("ERROR GETTING POSTS");
    }
  }
);

// slice
const postSlice = createSlice({
  name: "list",
  initialState: {
    list: [
      {
        writer: "list 테스트",
        contents: "list 테스트",
        id: 150,
        title: "list 테스트",
      },
    ],
    post: {
      writer: "post 테스트",
      contents: "post 테스트",
      id: 150,
      title: "post 테스트",
    },
    success: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 게시글 리스트(R)
      .addCase(__getPostList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__getPostList.fulfilled, (state, action) => {
        state.loading = false;
        // 리스트 전체 저장
        state.list = action.payload;
        state.success = true;
      })
      .addCase(__getPostList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 등록(C)
      .addCase(__addPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__addPost.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
        state.success = true;
      })
      .addCase(__addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 삭제 (D)
      .addCase(__deletePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter((post) => post.id !== action.payload);
        state.success = true;
      })
      .addCase(__deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 수정(U)
      .addCase(__updatePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__updatePost.fulfilled, (state, action) => {
        return state.list.map((post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              content: action.payload.contents,
              title: action.payload.title,
              writer: action.payload.writer,
            };
          } else {
            return post;
          }
        });
      })
      .addCase(__updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(__getPostCount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(__getPostCount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // 리스트 전체 저장
        state.list = action.payload;
      })
      .addCase(__getPostCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
