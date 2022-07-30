import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.div<{
  type: "primary" | "secondary";
  width: string;
}>`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 3rem;
  width: ${(props) => props.width};
  height: 3rem;
  border: 1px solid #2f3437;
  border-radius: 3px;
  color: ${(props) => (props.type === "primary" ? "#f5f4f1" : "#2f3437")};
  user-select: none;
  cursor: pointer;
  font-size: 1.2rem;
  background-color: ${(props) =>
    props.type === "primary" ? "#2f3437" : "none"};
  :hover {
    background-color: ${(props) =>
      props.type === "primary" ? "#161819" : "#deded9"};
  }
`;

interface ButtonProps {
  label?: string;
  type?: "primary" | "secondary";
  width?: string;
  onClick: () => void;
  children?: ReactNode;
}

function Button({
  label,
  width = "15rem",
  type = "primary",
  onClick,
  children,
}: ButtonProps) {
  return (
    <StyledButton onClick={onClick} type={type} width={width}>
      {children} {label}
    </StyledButton>
  );
}

export default Button;
