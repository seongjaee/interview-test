import React from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import { ICard } from "types";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

interface QuestionListProps {
  cards: ICard[];
}

function QuestionList({ cards }: QuestionListProps) {
  return (
    <CardContainer>
      {cards.map((card) => (
        <QuestionCard key={card.id} card={card} />
      ))}
    </CardContainer>
  );
}

export default QuestionList;
