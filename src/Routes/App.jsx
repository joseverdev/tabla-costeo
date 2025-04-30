import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./home/HomePage";
import { CreatePage } from "./create/CreatePage";
import { ProductNamePage } from "./productName/ProductNamePage";
import { SaveListPage } from "./saveList/SaveListPage";
import { ShowSavePage } from "./showSave/ShowSavePage";
import { CreateTest } from "./create-test/create-test";
import { ShowTest } from "./show-test/show-test";

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
          <Route path='/create-test' element={<CreateTest/>} />
          <Route path='/show-test' element={<ShowTest/>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export { App };
