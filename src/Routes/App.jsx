import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./home/HomePage";
import { CreatePage } from "./create/CreatePage";
import { ProductNamePage } from "./productName/ProductNamePage";
import { SaveListPage } from "./saveList/SaveListPage";
import { ShowSavePage } from "./showSave/ShowSavePage";
import { TutorialPage } from "./tutorial/TutorialPage";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/product-name" element={<ProductNamePage />} />
          <Route path="/save-list" element={<SaveListPage />} />
          <Route path="/show-save" element={<ShowSavePage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export { App };
