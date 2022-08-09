import React, { useRef, useEffect, useState, useCallback } from "react";

import ListItem from "./ListItem";
import styled from "styled-components";
import axios from "axios";

import Loading from "../common/Loading";

function List() {
  const [posts, setPost] = useState([]); //게시물들
  const [page, setPage] = useState(1); //현재 페이지
  const [loading, setLoading] = useState(false); //로깅 스피너
  let postsRef = useRef({});
  let loadingRef = useRef(null);
  let pageRef = useRef({});
  postsRef.current = posts;
  pageRef.current = page;
  const itemCount = 5;

  // console.log(postsRef, pageRef);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !loading) {
      observer.unobserve(entry.target);
      await getPosts();
      setPage(pageRef.current + 1); //페이지 값 증가
      observer.observe(entry.target);
    }
  };

  // 옵저버 생성
  useEffect(() => {
    getPosts();
    setPage(pageRef.current + 1); //페이지 증가

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    });
    observer.observe(loadingRef.current);
    return () => observer && observer.disconnect();
  }, []);

  // getPosts : post를 서버에서 가져오는 함수
  const getPosts = async () => {
    try {
      await setLoading(true); //로딩 시작
      await new Promise((resolve) => setTimeout(resolve, 1500)); //기다려준다.
      let postsRetrieved = await axios.get(
        `http://localhost:5001/list?_page=${pageRef.current}&_limit=${itemCount}`
      );
      if (postsRetrieved) {
        await setPost([...postsRef.current, ...postsRetrieved.data]);
      }
      setLoading(false); //로딩 종료
    } catch (error) {
      console.log("ERROR GETTING POSTS");
    }
  };

  return (
    <>
      <StyledContainer>
        {posts.map((post, index) => {
          if (index > 4) {
            return (
              <>
                <ListItem key={post.id} post={post} />
              </>
            );
          }
        })}
        <div
          ref={loadingRef}
          style={{
            height: "100px",
            margin: "25px",
          }}
        >
          {loading ? <Loading /> : <></>}
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
