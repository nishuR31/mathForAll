import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import OwnerInformation from './pages/owner-information';
import VideoLearningCenter from './pages/video-learning-center';
import TeachersShowcase from './pages/teachers-showcase';
import InformationHub from './pages/information-hub';
import NotesLibrary from './pages/notes-library';

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
        <Route path="/video-learning-center" element={<VideoLearningCenter />} />
        <Route path="/teachers-showcase" element={<TeachersShowcase />} />
        <Route path="/information-hub" element={<InformationHub />} />
        <Route path="/notes-library" element={<NotesLibrary />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
