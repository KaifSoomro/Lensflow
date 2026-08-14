import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Illustrations from "./pages/illustrations";
import DownloadHistory from "./pages/DownloadHistory";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyPage from "./pages/VerifyPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import ProtectRoutes from "./components/common/ProtectRoutes";
import CategoryPage from "./pages/CategoryPage";
import SubmitPhoto from "./pages/SubmitPhoto";
import SinglePhoto from "./pages/SinglePhoto";
import ProfilePhotoPage from "./pages/ProfilePhotoPage";
import ProfileIllustrationsPage from "./pages/ProfileIllustrationsPage";
import ProfileCollectionsPage from "./pages/ProfileCollectionsPage";
import SingleCollection from "./pages/SingleCollection";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/illustrations" element={<Illustrations />} />
          <Route path="/t/:category" element={<CategoryPage />} />
          <Route path="/photo/:photoId" element={<SinglePhoto />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/download-history" element={<DownloadHistory />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile/:userId" element={<Profile />}>
              <Route index element={<ProfilePhotoPage />} />
              <Route path="illustrations" element={<ProfileIllustrationsPage />} />
              <Route path="collections" element={<ProfileCollectionsPage />} />
            </Route>
             <Route path="/profile/:userId/collections/:collectionId" element={<SingleCollection />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/submit-photo" element={<SubmitPhoto />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<VerifyPage />} />
        <Route element={<ProtectRoutes />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
