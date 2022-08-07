import React from "react";
import Button from "../common/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <StyledContainer>
        <Link to="/add">
          <Button>글 쓰기</Button>
        </Link>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Header;
