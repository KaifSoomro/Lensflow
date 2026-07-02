import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Illustrations from "./pages/illustrations";
import Collections from "./pages/Collections";
import DownloadHistory from "./pages/DownloadHistory";
import Bookmarks from "./pages/Bookmarks"
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/illustrations" element={<Illustrations />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/download-history" element={<DownloadHistory />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
