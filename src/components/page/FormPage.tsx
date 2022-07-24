import React from "react";
import styled from "styled-components";
import NavBar from "components/ui/NavBar";

const PageContainer = styled.div`
  margin: 2rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div`
  margin: 1.6rem 0;
`;

const StyledTextArea = styled.textarea`
  width: 36rem;
  height: 3rem;
  font-size: 1rem;
  resize: none;
  border: none;
  padding: 2rem;

  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

type Props = {};

function FormPage({}: Props) {
  return (
    <>
      <NavBar />
      <PageContainer>
        <InputBox>
          <div>타이틀</div>
          <StyledTextArea></StyledTextArea>
        </InputBox>
        <InputBox>
          <div>질문</div>
          <StyledTextArea></StyledTextArea>
        </InputBox>
        <InputBox>
          <div>태그</div>
          <StyledTextArea></StyledTextArea>
        </InputBox>
      </PageContainer>
    </>
  );
}

export default FormPage;
