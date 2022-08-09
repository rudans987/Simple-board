import React, { useRef, useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { __getCommnetsByTodoId } from "../redux/modules/commentsSlice";
import { useForm } from "react-hook-form";
import { __addPost, __updatePost } from "../redux/modules/postSlice";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/common/Button";
import AddComment from "../components/comments/AddComment";
import Comment from "../components/comments/Comment";
import Header from "../components/common/Header";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Pagination from '../components/comments/Pagination';




const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function Detail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const inputRef = useRef(null); //input에 focus 주기
  //페이지네이션
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { data } = useSelector((state) => state.comments.commentsByTodoId);
console.log(data)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

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
    if (post_id) {
      axios.get(`${URI.BASE}?id=${post_id}`).then((response) => {
        setValue("writer", response.data[0].writer);
        setValue("title", response.data[0].title);
        setValue("contents", response.data[0].contents);
        setPost(response.data[0]);
      });
    }
    dispatch(__getCommnetsByTodoId(post_id));
    return () => dispatch(__getCommnetsByTodoId("a"));
  }, []);

  const onSubmit = (data) => {
    dispatch(__addPost({ ...data }));
    console.log(data);
    navigator("/");
  };

  const onUpdate = (data) => {
    if (post) {
      dispatch(
        __updatePost({
          id: post_id,
          writer: data.writer,
          title: data.title,
          contents: data.contents,
        })
      );
    }
    navigator("/");
  };

  return (
    <>
      <Header />

      <StyledForm
        onSubmit={post_id ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}
      >
        {post_id ? "게시글 ID : " + post_id : ""}
        <StyledInputBox>
          <StyledLabel>작성자</StyledLabel>
          {match2 ? (
            <h2>{post.writer}</h2>
          ) : (
            <>
              <TextField
                name="writer"
                ref={inputRef}
                id="filled-error-helper-text"
                helperText={errors && errors?.writer?.message}
                variant="filled"
                {...register("writer", {
                  required: {
                    value: true,
                    message: "작성자를 입력해주세요.",
                  },
                  minLength: {
                    value: 2,
                    message: "최소 2자 이상의 작성자를 입력해주세요.",
                  },
                  maxLength: {
                    value: 8,
                    message: "최대 8자 이하의 작성자를 입력해주세요.",
                  },
                })}
              />
            </>
          )}
        </StyledInputBox>
        <StyledInputBox>
          <StyledLabel>제목</StyledLabel>
          {match2 ? (
            <h2>{post.title}</h2>
          ) : (
            <>
              <StyledInput
                name="title"
                {...register("title", {
                  required: {
                    value: true,
                    message: "제목을 입력해주세요.",
                  },
                  minLength: {
                    value: 2,
                    message: "최소 2자 이상의 제목을 입력해주세요.",
                  },
                  maxLength: {
                    value: 10,
                    message: "최대 10자 이하의 제목을 입력해주세요.",
                  },
                })}
              />
              {errors && errors?.title?.message}
            </>
          )}
        </StyledInputBox>

        <StyledInputBox>
          <StyledLabel>내용</StyledLabel>
          {match2 ? (
            <h2>{post.contents}</h2>
          ) : (
            <>
              <StyledInput
                name="contents"
                {...register("contents", {
                  required: {
                    value: true,
                    message: "내용을 입력해주세요.",
                  },
                  minLength: {
                    value: 5,
                    message: "최소 5자 이상의 내용을 입력해주세요.",
                  },
                  maxLength: {
                    value: 100,
                    message: "최대 100자 이하의 내용을 입력해주세요.",
                  },
                })}
              />
              {errors && errors?.contents?.message}
            </>
          )}
        </StyledInputBox>
        {match2 ? "" : match ? <Button>수정</Button> : <Button>글 등록</Button>}
        <Link to="/">
          <Button>이전</Button>
        </Link>
      </StyledForm>

      
      {match2 && (<div>
        <AddComment />
        {data.slice(offset, offset + limit).map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      {/* 페이지네이션 푸터 */}
      <footer>
      <Pagination
        total={data.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </footer>
    </div>
          )}
    </>
  );
}
export default Detail;

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
  &input:invalid ~ span {
    display: block;
  }
`;

const StyledErrorMsg = styled.span`
  color: red;
  font-size: 12px;
  padding: 3px;
  display: none;
`;


