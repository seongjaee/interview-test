import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledHomeButton = styled.div`
  width: 16rem;
  height: 2rem;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
  display: flex;
  line-height: 2rem;
  gap: 0.6rem;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 2rem;
  height: 2rem;
  /* background: url("/logo.png") center center; */
  /* background-size: cover; */
`;

type Props = {};

function HomeButton({}: Props) {
  const navigate = useNavigate();
  return (
    <StyledHomeButton onClick={() => navigate("/")}>
      {/* <ImageContainer /> */}
      Home
    </StyledHomeButton>
  );
}

export default HomeButton;
