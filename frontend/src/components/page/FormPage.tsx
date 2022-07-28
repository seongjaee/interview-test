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
  margin: 1rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
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

type Props = {};

function FormPage({}: Props) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [tag, setTag] = useState("");

  const navigate = useNavigate();

  // const [tagList, setTagList] = useState('');

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value);
  };
  const handleTagChange = (event: any) => {
    setTag(event.target.value);
  };

  const handleSubmit = async () => {
    const payload: IPage = {
      Title: { title: [{ text: { content: title } }] },
      Question: { rich_text: [{ text: { content: question } }] },
      Tags: { multi_select: [{ name: tag }] },
    };
    // console.log(payload);
    const response = await createPage(payload);
    console.log(response);
    if (response.status == 200) {
      navigate("/questions");
    } else {
      alert("요청에 실패했습니다.");
    }
  };

  return (
    <>
      <NavBar />
      <PageContainer>
        <PageTitle label="질문 추가하기" />
        <InputContainer>
          <div>
            <TitleIcon></TitleIcon>타이틀
          </div>
          <InputBox value={title} onChange={handleTitleChange} />
        </InputContainer>
        <InputContainer>
          <div>
            <TextIcon></TextIcon>질문
          </div>
          <InputBox value={question} onChange={handleQuestionChange} />
        </InputContainer>
        <InputContainer>
          <div>
            <TagIcon></TagIcon>태그
          </div>
          <InputBox value={tag} onChange={handleTagChange} />
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
