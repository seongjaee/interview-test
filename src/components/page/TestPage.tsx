import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as RightArrowSvg } from "icons/RightArrow.svg";
import { ReactComponent as LeftArrowSvg } from "icons/LeftArrow.svg";
import { ICard } from "types";
import Button from "components/ui/Button";
import QuestionCard from "components/ui/QuestionCard";
import HomeButton from "components/ui/HomeButton";
import NavBar from "components/ui/NavBar";

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

function TestPage({ cards }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleClickNextButton = () => {
    if (questionIndex == cards.length - 1) {
      // 결과 페이지로 넘어가기
      return;
    }
    setQuestionIndex((prev) => ++prev);
    console.log(questionIndex);
  };

  const handleClickPassButton = () => {
    if (questionIndex == cards.length - 1) {
      // 결과 페이지로 넘어가기
      return;
    }
    setQuestionIndex((prev) => ++prev);
    console.log(questionIndex);
  };

  return (
    <>
      <NavBar />
      <PageContainer>
        <StyledH2>다음 질문에 대답해주세요</StyledH2>
        {cards.length !== 0 && (
          <>
            <CardContainer>
              <QuestionCard card={cards[questionIndex]}></QuestionCard>
            </CardContainer>
            <EmptyBox />
          </>
        )}
        <ButtonContainer>
          <Button
            label="이 질문은 나중에 다시 보기"
            type="secondary"
            onClick={handleClickPassButton}
            width="19rem"
          ></Button>
          <Button
            label={`다음 질문 ( ${questionIndex + 1} / ${cards.length} )`}
            onClick={handleClickNextButton}
            width="19rem"
          ></Button>
        </ButtonContainer>
      </PageContainer>
    </>
  );
}

export default TestPage;
