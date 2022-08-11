import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPostList, __deletePost } from "../../redux/modules/postSlice";
import ListItem from "./ListItem";
import styled from "styled-components";
import axios from "axios";

import Loading from "../common/Loading";

function List() {


  const postlist = useSelector((state) => state.postSlice.list);
  const loading = useSelector((state) => state.postSlice.loading);
  const dispatch = useDispatch();
  const [posts, setPost] = useState([]); //게시물들
  const [page, setPage] = useState(1); //현재 페이지
  let postsRef = useRef({});
  let loadingRef = useRef(null);
  let pageRef = useRef({});
  postsRef.current = posts;
  pageRef.current = page;
  const itemCount = 5;
  
  
const URI = {
  BASE2: process.env.REACT_APP_BASE_URI2,
};
 

  const onIntersect = async ([entry], observer) => {
    // 타겟 엘리멘트가 교차영역에 있고, loading중이 아닐때

    if (entry.isIntersecting && !loading) {
      observer.unobserve(entry.target);
      await getPosts();
      setPage(pageRef.current + 1); //페이지 값 증가
      observer.observe(entry.target);
    } else if (entry.isIntersecting && loading) {
      observer.unobserve(entry.target);
    }
  };

  // 옵저버 생성
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    });
    observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, []);

  // getPosts : post를 서버에서 가져오는 함수
  const getPosts = async () => {
    try {
      //로딩 시작
      await new Promise((resolve) => setTimeout(resolve, 100)); //기다려준다.
      let postsRetrieved = await axios.get(

        `${URI.BASE2}?_page=${pageRef.current}&_limit=${itemCount}`
      );
      if (postsRetrieved) {
        setPost([...postsRef.current, ...postsRetrieved.data]);
      }
    } catch (error) {
      console.log("ERROR GETTING POSTS");
    }
  };

  useEffect(() => {
    dispatch(__getPostList());
  }, []);

  const onDeleteHandler = (postId) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deletePost(postId));
    } else {
      return;
    }
  };


const newlist = postlist.slice(0, posts.length)
console.log(newlist)
  return (
    <>
      <StyledContainer>
        {newlist.map((post, index) => {
          return (
          
            <div key={post.id}>
              <ListItem
               
                post={post}
                onDeleteHandler={onDeleteHandler}
              />
            </div>
          );
        })}
        <div
          ref={loadingRef}
          style={{
            height: "100px",
            margin: "25px",
          }}
        >
          {loading && <Loading />}
        </div>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default List;
