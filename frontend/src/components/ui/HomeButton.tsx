import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledHomeButton = styled.div`
  width: 10rem;
  height: 4rem;
  cursor: pointer;
  font-size: 2rem;
`;

const ImageContainer = styled.span`
  width: 5rem;
  height: 4rem;
  // background-image
`;

type Props = {};

function HomeButton({}: Props) {
  const navigate = useNavigate();
  return (
    <StyledHomeButton onClick={() => navigate("/")}>
      <ImageContainer />
      Home
    </StyledHomeButton>
  );
}

export default HomeButton;
