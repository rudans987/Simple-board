import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getPostList, __deletePost } from "../../redux/modules/postSlice";
import ListItem from "./ListItem";
import styled from "styled-components";

function List() {
  const dispatch = useDispatch();
  const postlist = useSelector((state) => state.postSlice.list);

  useEffect(() => {
    dispatch(__getPostList());
  }, []);

  const onDeleteHandler = (postId) => {
    dispatch(__deletePost(postId));
  };
  return (
    <>
      <StyledContainer>
        {postlist.map((post) => {
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
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default List;
