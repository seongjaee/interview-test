import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuestionList from "components/ui/QuestionList";
import { ICard } from "types";
import NavBar from "components/ui/NavBar";
import { useNavigate } from "react-router-dom";
import PageTitle from "components/ui/PageTitle";
import { getQuestionList } from "api/api";

const PageContainer = styled.div`
  margin: 1rem 10rem;
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

interface DataPageProps {
  cards: ICard[];
}

function DataPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<ICard[]>([]);

  const onDeletePage = () => {
    getQuestionList().then((questionList) => {
      setCards(questionList);
    });
  };

  useEffect(() => {
    getQuestionList().then((questionList) => {
      setCards(questionList);
      console.log(questionList);
    });
  }, []);
  return (
    <>
      <NavBar />
      <PageContainer>
        <PageTitle label="질문 목록" />
        <QuestionList cards={cards} onDeletePage={onDeletePage}></QuestionList>
        <AddButton
          onClick={() => {
            navigate("/form");
          }}
        >
          질문 추가하기
        </AddButton>
      </PageContainer>
    </>
  );
}

export default DataPage;
