import React from "react";
import styled from "styled-components";
import HomeButton from "./HomeButton";

const StyledNavBar = styled.div`
  width: calc(100% - 12rem);
  height: 3rem;
  margin: 0.6rem 6rem;
  padding: 0.4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NavBar() {
  return (
    <StyledNavBar>
      <HomeButton />
    </StyledNavBar>
  );
}

export default NavBar;
