import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 40rem;
  height: 3rem;
  font-size: 1rem;
  resize: none;
  border: 2px solid #ccc;
  padding: 0.6rem 1rem;
  border-radius: 3px;
`;

interface InputBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
}

function InputBox({ value = "", onChange }: InputBoxProps) {
  return <StyledInput value={value} onChange={onChange} />;
}

export default InputBox;
