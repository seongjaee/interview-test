import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "components/ui/NavBar";
import InputBox from "components/ui/InputBox";
import Button from "components/ui/Button";
import { IPage } from "../../types";
import { createPage } from "api/api";
import { useNavigate } from "react-router-dom";
import PageTitle from "components/ui/PageTitle";
import { ReactComponent as TextIcon } from "../../icons/text.svg";
import { ReactComponent as TitleIcon } from "../../icons/title.svg";
import { ReactComponent as TagIcon } from "../../icons/tag.svg";

const PageContainer = styled.div`
  margin: 0 10rem 1rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin: 0.4rem 0 1rem 0;
  div {
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;
    font-weight: bold;
    gap: 0.4rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const TokenContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DeleteMark = styled.span`
  margin-left: 5px;
  display: none;

  &:hover {
    cursor: pointer;
  }
`;

const BadgeContainer = styled.span`
  border-radius: 3px;
  padding: 4px 8px;
  line-height: 0.8rem;
  background: #f5e0e9;
  font-size: 0.8rem;
  font-weight: 400;
  &:hover ${DeleteMark} {
    display: inline;
  }
  &:hover {
    cursor: default;
  }
`;

interface BadgeProps {
  label: string;
  deleteBadge: (i: number) => void;
  index: number;
}

function Badge({ label, deleteBadge, index }: BadgeProps) {
  const onClickDeleteMark = () => {
    deleteBadge(index);
  };

  return (
    <BadgeContainer>
      {label}
      <DeleteMark onClick={onClickDeleteMark}>X</DeleteMark>
    </BadgeContainer>
  );
}

type Props = {};

function FormPage({}: Props) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [tag, setTag] = useState("");

  const navigate = useNavigate();

  const [tagList, setTagList] = useState<string[]>([]);

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value);
  };
  const handleTagChange = (event: any) => {
    setTag(event.target.value);
  };

  const onKeyDown = (event: any) => {
    if (event.key !== "Enter") {
      return;
    }
    const label = event.target.value.replace(/ /gi, "");
    console.log(label);
    if (label.length === 0) {
      event.target.value = "";
      return;
    }

    if (tagList.find((tag) => tag === label)) {
      setTag("");
      event.target.value = "";
      return;
    }

    setTagList((prev) => [...prev, label]);
    event.target.value = "";
    setTag("");
  };

  const handleSubmit = async () => {
    const payload: IPage = {
      Title: { title: [{ text: { content: title } }] },
      Question: { rich_text: [{ text: { content: question } }] },
      Tags: { multi_select: tagList.map((tag) => ({ name: tag })) },
    };
    const response = await createPage(payload);
    console.log(response);
    if (response.status == 200) {
      navigate("/questions");
    } else {
      alert("요청에 실패했습니다.");
    }
  };

  const onClickBadgeRemove = (i: number) => {
    console.log(i);
    setTagList((prev) => [
      ...prev.slice(0, i),
      ...prev.slice(i + 1, prev.length),
    ]);
  };

  return (
    <>
      <NavBar />
      <PageContainer>
        <PageTitle label="질문 추가하기" />
        <InputContainer>
          <div>
            <TitleIcon />
            타이틀
          </div>
          <InputBox value={title} onChange={handleTitleChange} />
        </InputContainer>
        <InputContainer>
          <div>
            <TextIcon />
            질문
          </div>
          <InputBox value={question} onChange={handleQuestionChange} />
        </InputContainer>
        <InputContainer>
          <div>
            <TagIcon />
            태그
          </div>
          <TokenContainer>
            {tagList.map((tag, idx) => (
              <Badge
                deleteBadge={() => onClickBadgeRemove(idx)}
                label={tag}
                key={idx}
                index={idx}
              />
            ))}
          </TokenContainer>
          <InputBox
            value={tag}
            onChange={handleTagChange}
            onKeyDown={onKeyDown}
          />
        </InputContainer>

        <ButtonContainer>
          <Button
            label="뒤로가기"
            type="secondary"
            onClick={() => {
              navigate("/questions");
            }}
          ></Button>
          <Button label="추가하기" onClick={handleSubmit}></Button>
        </ButtonContainer>
      </PageContainer>
    </>
  );
}

export default FormPage;
