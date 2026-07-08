import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Illustrations from "./pages/illustrations";
import Collections from "./pages/Collections";
import DownloadHistory from "./pages/DownloadHistory";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyPage from "./pages/VerifyPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import ProtectRoutes from "./components/common/ProtectRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/illustrations" element={<Illustrations />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/collections" element={<Collections />} />
            <Route path="/download-history" element={<DownloadHistory />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<VerifyPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;
