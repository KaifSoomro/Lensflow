import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home.jsx"));
const Layout = lazy(() => import("./layouts/Layout.jsx"));
const Illustrations = lazy(() => import("./pages/Illustrations.jsx"));
const DownloadHistory = lazy(() => import("./pages/DownloadHistory.jsx"));
const Bookmarks = lazy(() => import("./pages/Bookmarks.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const VerifyPage = lazy(() => import("./pages/VerifyPage.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const Notifications = lazy(() => import("./pages/Notifications.jsx"));
const ProtectRoutes = lazy(() => import("./components/common/ProtectRoutes.jsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));
const SubmitPhoto = lazy(() => import("./pages/SubmitPhoto.jsx"));
const SinglePhoto = lazy(() => import("./pages/SinglePhoto.jsx"));
const ProfilePhotoPage = lazy(() => import("./pages/ProfilePhotoPage.jsx"));
const ProfileIllustrationsPage = lazy(
  () => import("./pages/ProfileIllustrationsPage.jsx")
);
const ProfileCollectionsPage = lazy(
  () => import("./pages/ProfileCollectionsPage.jsx")
);
const SingleCollection = lazy(
  () => import("./pages/SingleCollection.jsx")
);
const EditAccountDetails = lazy(
  () => import("./pages/EditAccountDetails.jsx")
);
const ChangePassword = lazy(
  () => import("./pages/ChangePassword.jsx")
);
const CloseAccount = lazy(
  () => import("./pages/CloseAccount.jsx")
);

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
          <Route path="/account" element={<Settings />}>
             <Route index element={<EditAccountDetails />} />
             <Route path="password" element={<ChangePassword />} />
             <Route path="close" element={<CloseAccount />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
