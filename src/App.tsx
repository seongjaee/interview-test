import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "components/page/MainPage";
import DataPage from "components/page/DataPage";
import TestPage from "components/page/TestPage";
import FormPage from "components/page/FormPage";
import { getQuestionList } from "api/api";
import { ICard } from "types";

function App() {
  const [cards, setCards] = useState<ICard[]>([]);
  useEffect(() => {
    getQuestionList().then((questionList) => {
      setCards(questionList);
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />}></Route>
        <Route path="questions" element={<DataPage cards={cards} />}></Route>
        <Route path="test" element={<TestPage cards={cards} />}></Route>
        <Route path="form" element={<FormPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
