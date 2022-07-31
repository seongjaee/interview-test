import React from "react";
import styled from "styled-components";
import { ICard } from "types";

const Card = styled.article`
  background-color: #faf9f8;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 40rem;
`;
const TokenContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Token = styled.span`
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  border-radius: 3px;
  display: inline-block;
  background: #f5e0e9;
  margin-bottom: 0.5rem;
`;

interface QuestionCardProps {
  card: ICard;
}

function QuestionCard({ card }: QuestionCardProps) {
  return (
    <Card>
      <TokenContainer>
        {card.tags.map((tag) => (
          <Token key={tag.id}>{tag.name}</Token>
        ))}
      </TokenContainer>
      {card.question}
    </Card>
  );
}

export default QuestionCard;
