import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "components/ui/Button";
import QuestionCard from "components/ui/QuestionCard";
import NavBar from "components/ui/NavBar";
import LoadingSpinner from "components/ui/LoadingSpinner";
import Camera from "components/ui/Camera";
import { useNavigate } from "react-router-dom";
import { getQuestionList } from "api/api";
import { ICard } from "types";

const PageContainer = styled.div`
  margin: 0 12rem 1rem 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledH2 = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0.4rem 0;
`;

const CardContainer = styled.div`
  margin: 0.6rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

function TestPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [randomCards, setRandomCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mediaReady, setMediaReady] = useState(false);

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
    getQuestionList()
      .then((questionList) => {
        const randoms = [...questionList].sort(() => Math.random() - 0.5);
        const length = randoms.length >= 10 ? 10 : randoms.length;
        setRandomCards(randoms.slice(0, length));
        setIsLoading(false);
      })
      .catch((e) => {
        alert("데이터 불러오기에 실패했습니다");
      });
  }, []);

  return (
    <>
      <NavBar />
      <PageContainer>
        <StyledH2>다음 질문에 대답해주세요</StyledH2>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {randomCards.length !== 0 && (
              <>
                <CardContainer>
                  <QuestionCard
                    card={randomCards[questionIndex]}
                  ></QuestionCard>
                </CardContainer>
              </>
            )}
            <Camera onMediaReady={() => setMediaReady(true)} />
            <ButtonContainer>
              <Button
                label="테스트 종료"
                type="secondary"
                onClick={() => navigate("/")}
                width="19rem"
              ></Button>
              <Button
                label={`다음 질문 ( ${questionIndex + 1} / ${
                  randomCards.length
                } )`}
                onClick={handleClickNextButton}
                width="19rem"
              ></Button>
            </ButtonContainer>
          </>
        )}
      </PageContainer>
    </>
  );
}

export default TestPage;
