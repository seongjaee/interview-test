import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "components/page/MainPage";
import DataPage from "components/page/DataPage";
import TestPage from "components/page/TestPage";
import FormPage from "components/page/FormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />}></Route>
        <Route path="questions" element={<DataPage />}></Route>
        <Route path="test" element={<TestPage />}></Route>
        <Route path="form" element={<FormPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
