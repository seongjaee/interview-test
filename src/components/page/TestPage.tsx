import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ICard } from "types";
import Button from "components/ui/Button";
import QuestionCard from "components/ui/QuestionCard";
import NavBar from "components/ui/NavBar";
import { useNavigate } from "react-router-dom";
import { getQuestionList } from "api/api";

const PageContainer = styled.div`
  margin: 2rem 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledH2 = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;

const CardContainer = styled.div`
  margin: 1rem 0;
`;

const EmptyBox = styled.div`
  width: 20rem;
  height: 20rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

interface Props {
  cards: ICard[];
}

function TestPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [randomCards, setRandomCards] = useState<ICard[]>([]);

  const navigate = useNavigate();

  const handleClickNextButton = () => {
    if (questionIndex == randomCards.length - 1) {
      // 결과 페이지로 넘어가기
      return;
    }
    setQuestionIndex((prev) => ++prev);
    console.log(questionIndex);
  };

  useEffect(() => {
    getQuestionList().then((questionList) => {
      const randoms = [...questionList].sort(() => Math.random() - 0.5);
      const length = randoms.length >= 10 ? 10 : randoms.length;
      setRandomCards(randoms.slice(0, length));
    });
  }, []);

  return (
    <>
      <NavBar />
      <PageContainer>
        <StyledH2>다음 질문에 대답해주세요</StyledH2>
        {randomCards.length !== 0 && (
          <>
            <CardContainer>
              <QuestionCard card={randomCards[questionIndex]}></QuestionCard>
            </CardContainer>
            <EmptyBox />
          </>
        )}
        <ButtonContainer>
          <Button
            label="테스트 종료"
            type="secondary"
            onClick={() => navigate("/")}
            width="19rem"
          ></Button>
          <Button
            label={`다음 질문 ( ${questionIndex + 1} / ${randomCards.length} )`}
            onClick={handleClickNextButton}
            width="19rem"
          ></Button>
        </ButtonContainer>
      </PageContainer>
    </>
  );
}

export default TestPage;
