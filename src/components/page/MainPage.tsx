import React from "react";
import styled from "styled-components";
import Button from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "components/ui/NavBar";

const PageContainer = styled.div`
  margin: 0 5rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

type Props = {};

function MainPage({}: Props) {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <PageContainer>
        <Title>제목</Title>
        <ButtonContainer>
          <Button
            label="시작하기"
            type="primary"
            onClick={() => navigate("test")}
          ></Button>
          <Button
            label="질문 목록 보기"
            type="secondary"
            onClick={() => navigate("questions")}
          ></Button>
        </ButtonContainer>
      </PageContainer>
    </>
  );
}

export default MainPage;
