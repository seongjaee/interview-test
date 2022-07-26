import React from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
  margin: 1rem 0;
  font-size: 1.6rem;
  text-align: start;
`;
const TitleContainer = styled.div`
  width: 42rem;
  margin-bottom: 1rem;
`;

interface PageTitleProps {
  label: string;
}

function PageTitle({ label }: PageTitleProps) {
  return (
    <TitleContainer>
      <StyledH2>{label}</StyledH2>
    </TitleContainer>
  );
}

export default PageTitle;
