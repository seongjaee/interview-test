import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuestionList from "components/ui/QuestionList";
import { ICard } from "types";
import NavBar from "components/ui/NavBar";
import { useNavigate } from "react-router-dom";
import PageTitle from "components/ui/PageTitle";
import { getQuestionList } from "api/api";
import LoadingSpinner from "components/ui/LoadingSpinner";

const PageContainer = styled.div`
  margin: 0 10rem 1rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddButton = styled.div`
  width: 42rem;
  height: 3.4rem;
  margin-top: 2rem;
  background-color: #2f3437;
  border-radius: 3px;
  color: #faf9f8;
  text-align: center;
  font-size: 1.2rem;
  line-height: 3.4rem;
  user-select: none;
  cursor: pointer;
  :hover {
    background-color: #161819;
  }
`;

function DataPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onDeletePage = () => {
    setIsLoading(true);
    getQuestionList().then((questionList) => {
      setCards(questionList);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getQuestionList()
      .then((questionList) => {
        setCards(questionList);
        console.log(questionList);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        alert("데이터 불러오기에 실패했습니다");
      });
  }, []);
  return (
    <>
      <NavBar />
      <PageContainer>
        <PageTitle label="질문 목록" />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <QuestionList
              cards={cards}
              onDeletePage={onDeletePage}
            ></QuestionList>
            <AddButton
              onClick={() => {
                navigate("/form");
              }}
            >
              질문 추가하기
            </AddButton>
          </>
        )}
      </PageContainer>
    </>
  );
}

export default DataPage;
