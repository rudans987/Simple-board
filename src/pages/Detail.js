import React, { useEffect } from "react";
import styled from "styled-components";
import {useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';

import Comment from "../components/comments/Comment";
import { clearTodo } from "../redux/modules/todoSlice";
import { __getCommnetsByTodoId } from "../redux/modules/commentsSlice";
import AddComment from "../components/comments/AddComment";


const Detail = ()=>{
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const todo_list = useSelector((state)=>state.todos.data);
    const todo = todo_list.find(cur=>cur.id == id)
    const navigate =useNavigate(); 

    useEffect(() => {
          dispatch(__getCommnetsByTodoId(id));
          return () =>  dispatch(__getCommnetsByTodoId("a"));
      }, []);

      const { data } = useSelector((state) => state.comments.commentsByTodoId);
      console.log(data)
    return(
        <div>
            <button onClick={() => {
                navigate("/");
            }}>
                홈으로
            </button>
            <div>게시글id : {todo.id}</div>
            <div>작성자 : {todo.writer}</div>
            <h2>제목 : {todo.title}</h2>
            <div>내용 : {todo.content}</div>


            <AddComment />
            <div>
          {data.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        </div>

    )
}


export default Detail;



