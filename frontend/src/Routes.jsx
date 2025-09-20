import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from "./pages/home-dashboard";
import OwnerInformation from "./pages/owner-information";
import VideoLearningCenter from "./pages/video-learning-center";
import TeachersShowcase from "./pages/teachers-showcase";
import InformationHub from "./pages/information-hub";
import NotesLibrary from "./pages/notes-library";
import LoginPage from "pages/login-signin/components/Login";
import RegisterPage from "pages/login-signin/components/Register";
import ResetPasswordPage from "pages/login-signin/components/Reset";
import ForgotPassword from "pages/login-signin/components/ForgotPass";
import PasswordLessPage from "pages/login-signin/components/Passless";
import Me from "pages/login-signin";
import Access from "pages/login-signin/components/Access";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<HomeDashboard />} />
          {/* <Route path="/home-dashboard" element={<HomeDashboard />} /> */}
          <Route path="/owner-information" element={<OwnerInformation />} />
          <Route
            path="/video-learning-center"
            element={<VideoLearningCenter />}
          />
          <Route path="/teachers-showcase" element={<TeachersShowcase />} />
          <Route path="/information-hub" element={<InformationHub />} />
          <Route path="/notes-library" element={<NotesLibrary />} />
          <Route path="/me" element={< Me />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-less" element={<PasswordLessPage />} />
          <Route path="/access" element={<Access />} />

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
