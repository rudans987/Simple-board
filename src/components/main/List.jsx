import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getPostList, __deletePost } from "../../redux/modules/postSlice";
import ListItem from "./ListItem";
import styled from "styled-components";
import axios from "axios";

function List() {
  const postlist = useSelector((state) => state.postSlice.list);
  const dispatch = useDispatch();

  const [posts, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // use this if you want the box to say "loading...". Forgot this lol.
  const [prevY, setPrevY] = useState(0);
  let postsRef = useRef({});

  let loadingRef = useRef(null);
  let prevYRef = useRef({});
  let pageRef = useRef({});
  postsRef.current = posts;
  pageRef.current = page;

  prevYRef.current = prevY;

  console.log("loadingRef: ", loadingRef);

  useEffect(() => {
    getPosts();
    setPage(pageRef.current + 1);

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current);
  }, []);

  const handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;

    if (prevYRef.current > y) {
      console.log("post를 가져온다");
      getPosts();
      setPage(pageRef.current + 1);
    } else {
    }
    console.log("currenty: ", y, "prevY: ", prevY);
    setPrevY(y);
  };

  const getPosts = async () => {
    try {
      let postsRetrieved = await axios.get(
        `http://localhost:5001/list?_page=${pageRef.current}&_limit=5`
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
    dispatch(__deletePost(postId));
  };

  return (
    <>
      <StyledContainer>
        {posts.map((post, index) => {
          return (
            <>
              <ListItem
                key={post.id}
                post={post}
                onDeleteHandler={onDeleteHandler}
              />
            </>
          );
        })}
        <div
          ref={loadingRef}
          style={{
            height: "100px",
            margin: "25px",
          }}
        >
          <span style={{ display: loading ? "block" : "none" }}>
            Loading...
          </span>
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
