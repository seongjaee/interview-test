import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 0.5rem solid #37352f;
  border-radius: 50%;
  border-right-color: transparent;
  animation: infinite 1s linear;
  animation-name: spinner;

  @keyframes spinner {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(1turn);
    }
  }
`;

type Props = {};

const LoadingSpinner = (props: Props) => {
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
};

export default LoadingSpinner;
