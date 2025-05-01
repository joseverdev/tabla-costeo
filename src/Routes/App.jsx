import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./home/HomePage";
import { CreatePage } from "./create/CreatePage";
import { SaveListPage } from "./saveList/SaveListPage";
import { ShowPage } from "./show/ShowPage";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path='/show' element={<ShowPage/>} />
          <Route path="/save-list" element={<SaveListPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export { App };
