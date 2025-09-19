import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import FeaturedNotesSection from "./components/FeaturedNotesSection";
import FeaturedVideosSection from "./components/FeaturedVideosSection";
import QuickAccessPanel from "./components/QuickAccessPanel";
import StatsSection from "./components/StatsSection";
import Icon from "../../components/AppIcon";

const HomeDashboard = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Home Dashboard - Mathematics for All | Free Mathematics Education
        </title>
        <meta
          name="description"
          content="Welcome to Mathematics for All - your gateway to free, comprehensive mathematics education. Access study notes, video lessons, and expert teaching resources without registration."
        />
        <meta
          name="keywords"
          content="mathematics education, free math resources, study notes, video lessons, calculus, algebra, geometry"
        />
        <meta
          property="og:title"
          content="Mathematics for All - Free Mathematics Education Platform"
        />
        <meta
          property="og:description"
          content="Discover free mathematics education through organized study notes and engaging video content. No registration required."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Featured Study Notes */}
          <FeaturedNotesSection />

          {/* Featured Video Lessons */}
          <FeaturedVideosSection />

          {/* Quick Access Panel */}
          <QuickAccessPanel />

          {/* Statistics Section */}
          <StatsSection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-20 h-20 bg-transparent rounded-lg flex items-center justify-center">
                    {/* <Icon name="Calculator" size={20} color="white" /> */}
                    <img
                      src="/assets/images/logo.png"
                      alt="log"
                      className="w-20"
                    />
                  </div>
                  <span className="font-heading font-semibold text-lg text-foreground">
                    Mathematics for All
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Providing free, accessible mathematics education to learners
                  worldwide. Our mission is to break down barriers to quality
                  mathematical learning.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-smooth cursor-pointer">
                    <Icon name="Mail" size={20} />
                  </div>
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-smooth cursor-pointer">
                    <Icon name="MessageCircle" size={20} />
                  </div>
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-smooth cursor-pointer">
                    <Icon name="Share2" size={20} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a
                      href="/notes-library"
                      className="hover:text-primary transition-smooth"
                    >
                      Study Notes
                    </a>
                  </li>
                  <li>
                    <a
                      href="/video-learning-center"
                      className="hover:text-primary transition-smooth"
                    >
                      Video Lessons
                    </a>
                  </li>
                  <li>
                    <a
                      href="/teachers-showcase"
                      className="hover:text-primary transition-smooth"
                    >
                      Our Teachers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/information-hub"
                      className="hover:text-primary transition-smooth"
                    >
                      Help & FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Subjects</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <span className="hover:text-primary transition-smooth cursor-pointer">
                      Algebra
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-primary transition-smooth cursor-pointer">
                      Calculus
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-primary transition-smooth cursor-pointer">
                      Geometry
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-primary transition-smooth cursor-pointer">
                      Statistics
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
              <p>
                &copy; {new Date()?.getFullYear()} Mathematics for All. All
                rights reserved. Made with ❤️ for education.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeDashboard;
