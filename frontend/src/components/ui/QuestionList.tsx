import React from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import { ICard } from "types";
import { deletePage } from "api/api";
import { ReactComponent as TrashIcon } from "../../icons/trash.svg";

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const CardContainer = styled.div`
  position: relative;
`;

const DeleteButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(50% - 0.8rem);
  right: 1.2rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 3px;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface QuestionListProps {
  cards: ICard[];
  onDeletePage: () => void;
}

function QuestionList({ cards, onDeletePage }: QuestionListProps) {
  const onClickDeleteButton = async (cardId: string) => {
    const response = await deletePage(cardId);
    if (response.status === 200) {
      onDeletePage();
    } else {
      alert("삭제에 실패했습니다");
    }
  };
  return (
    <CardListContainer>
      {cards.map((card) => (
        <CardContainer key={card.id}>
          <QuestionCard card={card} />
          <DeleteButton onClick={() => onClickDeleteButton(card.id)}>
            <TrashIcon width="1rem" height="1rem" />
          </DeleteButton>
        </CardContainer>
      ))}
    </CardListContainer>
  );
}

export default QuestionList;
