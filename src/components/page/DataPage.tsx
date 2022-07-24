import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuestionList from "components/ui/QuestionList";
import { getQuestionList, queryDatabase } from "api/api";
import HomeButton from "components/ui/HomeButton";
import { ICard } from "types";

const PageContainer = styled.div`
  margin: 2rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const AddButton = styled.div`
  width: 42rem;
  height: 4rem;
  background-color: #2f3437;
  border-radius: 3px;
  color: #faf9f8;
  text-align: center;
  font-size: 1.2rem;
  line-height: 4rem;
  cursor: pointer;
  :hover {
    background-color: #161819;
  }
`;

interface DataPageProps {
  cards: ICard[];
}

function DataPage({ cards }: DataPageProps) {
  return (
    <PageContainer>
      <HomeButton />
      <QuestionList cards={cards}></QuestionList>
      <AddButton onClick={() => {}}>질문 추가하기</AddButton>
    </PageContainer>
  );
}

export default DataPage;
