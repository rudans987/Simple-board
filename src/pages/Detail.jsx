import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { __addPost, __updatePost } from "../redux/modules/postSlice";
import axios from "axios";
import AddComment from "../components/comments/AddComment";
import Comment from "../components/comments/Comment";
import { __getCommnetsByTodoId } from "../redux/modules/commentsSlice";

function Detail() {
  const dispatch = useDispatch();
  const inputRef = useRef(null); //input에 focus 주기
  const { data } = useSelector((state) => state.comments.commentsByTodoId);

  const URI = {
    BASE: process.env.REACT_APP_BASE_URI2,
  };

  // 초기값
  const initialState = {
    id: 0,
    title: "",
    contents: "",
    writer: "",
  };

  const [post, setPost] = useState(initialState);

  // useMatch로 해당 주소가 맞는지 검사한다.
  const match = useMatch("/update/:id");
  const match2 = useMatch("/detail/:id");

  // 옵셔널 체이닝으로 id가 존재하면 post_id 저장
  let post_id = match?.params.id;
  if (match) {
    post_id = match.params.id;
  } else if (match2) {
    post_id = match2.params.id;
  }

  // 초기렌더링 시 input에 focus 주기
  // 비동기통신으로 id에 해당하는 post 정보 가져오기
  useEffect(() => {
    if (match) {
      inputRef.current.focus();
    }
    if (post_id) {
      axios
        .get(`${URI.BASE}?id=${post_id}`)
        .then((response) => setPost(response.data[0]));
    }
    dispatch(__getCommnetsByTodoId(post_id));
    return () => dispatch(__getCommnetsByTodoId("a"));
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setPost({ ...post, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__addPost({ ...post }));
    setPost(initialState); //input값 초기값으로 다시 세팅
    inputRef.current.focus(); // 등록될 때마다 input에 focus 주기
  };

  const onUpdateHandler = (e) => {
    e.preventDefault();
    if (post) {
      dispatch(
        __updatePost({
          id: post_id,
          writer: post.writer,
          title: post.title,
          contents: post.contents,
        })
      );
    }
  };

  return (
    <>
      <StyledForm onSubmit={post_id ? onUpdateHandler : onSubmitHandler}>
        {post_id ? "게시글 ID : " + post_id : ""}
        <StyledInputBox>
          <StyledLabel>작성자</StyledLabel>
          {match2 ? (
            <h2>{post.writer}</h2>
          ) : (
            <StyledInput
              name="writer"
              onChange={onChangeHandler}
              ref={inputRef}
              value={post.writer}
              required
            />
          )}
        </StyledInputBox>
        <StyledInputBox>
          <StyledLabel>제목</StyledLabel>
          {match2 ? (
            <h2>{post.title}</h2>
          ) : (
            <StyledInput
              name="title"
              onChange={onChangeHandler}
              value={post.title}
              required
            />
          )}
        </StyledInputBox>
        <StyledInputBox>
          <StyledLabel>내용</StyledLabel>
          {match2 ? (
            <h2>{post.contents}</h2>
          ) : (
            <StyledInput
              name="contents"
              onChange={onChangeHandler}
              value={post.contents}
              required
            />
          )}
        </StyledInputBox>
        {match2 ? "" : <Button>글 등록</Button>}
        <Link to="/">
          <Button>이전</Button>
        </Link>
      </StyledForm>

      <AddComment />
      <div>
        {data.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}

const StyledForm = styled.form`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 50vw;
  margin: 10px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
`;

const StyledLabel = styled.label`
  font-size: 15px;
  margin: 20px;
`;

const StyledInputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export default Detail;
