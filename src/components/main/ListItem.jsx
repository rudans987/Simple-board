import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";

function ListItem({ post, onDeleteHandler }) {
  return (
    <>
      <StyledContainer>
        <StyledContents>
          <StyledLink to={`/detail/${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.contents}</p>
          </StyledLink>
          <StyledItemButtons>
            <Button onClick={() => onDeleteHandler(post.id)}>삭제</Button>
            <Link to={`/update/${post.id}`}>
              <Button>수정</Button>
            </Link>
          </StyledItemButtons>
        </StyledContents>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  width: 60%;
  border: 1px solid #017573;
  margin: 10px;
  border-radius: 10px;
`;

const StyledContents = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
`;

const StyledTitle = styled.h3``;

const StyledItemButtons = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default ListItem;
