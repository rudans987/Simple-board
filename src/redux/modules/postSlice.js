import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

// 게시글 리스트
export const __getPostList = createAsyncThunk("GET_POSTS", async () => {
  const response = await axios.get("http://localhost:5001/list");
  // 전체 포스트 리스트
  return response.data;
});

//게시글 등록
export const __addPost = createAsyncThunk("ADD_POST", async (new_post_list) => {
  const response = await axios.post(
    "http://localhost:5001/list",
    new_post_list
  );
  // 전체 포스트 리스트
  return response.data;
});

// 게시글 삭제
export const __deletePost = createAsyncThunk("DELETE_POST", async (postId) => {
  const response = await axios.delete(`http://localhost:5001/list/${postId}`);
  // 포스트 아이디
  return postId;
});

//게시글 수정
export const __updatePost = createAsyncThunk(
  "UPDATE_POST",
  async ({ id, writer, title, contents }) => {
    const response = await axios.put(`http://localhost:5001/list/${id}`, {
      id: id,
      writer: writer,
      title: title,
      contents: contents,
    });

    return { id, writer, title, contents };
  }
);

//게시글 아이디로 post 정보 가져오기
// export const __getPostId = createAsyncThunk("GET_ID", async (postId) => {
//   const response = await axios.get(`http://localhost:5001/list?id=${postId}`);
//   // 게시글 리스트
//   return response.data[0];
// });

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
        state.list = state.list
          .map((post) => {
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
          })
          .addCase(__updatePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      });
    // .addCase(__getPostId.fulfilled, (state, action) => {
    //   return (state.post = {
    //     contents: action.payload.contents,
    //     title: action.payload.title,
    //     writer: action.payload.writer,
    //     ...state.post,
    //   });
    // });
  },
});

export default postSlice;
