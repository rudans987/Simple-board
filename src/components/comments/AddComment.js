import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { __addComment } from "../../redux/modules/commentsSlice";

const AddCommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [comment, setComment] = useState({
    username: "",
    content: "",
  });

  const onAddCommentButtonHandler = (event) => {
    event.preventDefault();
    if (comment.content.trim() === "" || comment.username.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addComment({ todoId: id, ...comment }));
    setComment({
      username: "",
      content: "",
    });
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <form onSubmit={onAddCommentButtonHandler}>
      <div>
        <input
          placeholder="이름 (5자 이내)"
          value={comment.username}
          type="text"
          name="username"
          onChange={onChangeInputHandler}
          maxLength={5}
        />
      </div>
      <input
        placeholder="댓글 (100자 이내)"
        value={comment.content}
        name="content"
        type="text"
        onChange={onChangeInputHandler}
        maxLength={100}
      />
      <button type="submit" onClick={onAddCommentButtonHandler}>
        추가하기
      </button>
    </form>
  );
};

export default AddCommentForm;