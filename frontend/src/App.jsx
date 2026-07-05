import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Illustrations from "./pages/illustrations";
import Collections from "./pages/Collections";
import DownloadHistory from "./pages/DownloadHistory";
import Bookmarks from "./pages/Bookmarks"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyPage from "./pages/VerifyPage";

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<VerifyPage />} />
      </Routes>
    </>
  );
};

export default App;
