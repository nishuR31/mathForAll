import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-[10rem] h-[10rem] bg-transparent rounded-2xl flex items-center justify-center shadow-elevated">
              {/* <Icon name="Calculator" size={32} color="white" /> */}
              <img
                src="/assets/images/logo.png"
                alt="log"
                className="w-[10rem] animate-pulse"
              />
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Mathematics for
            <span className="text-primary block lg:inline lg:ml-3">
              All
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover free, comprehensive mathematics education through organized
            study notes and engaging video content. No registration required –
            start learning immediately with our open-access educational
            resources.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/notes-library">
              <Button
                variant="default"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Explore Study Notes
              </Button>
            </Link>

            <Link to="/video-learning-center">
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Watch Video Lessons
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Download" size={24} className="text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                Free Downloads
              </h3>
              <p className="text-sm text-muted-foreground">
                Direct access to study materials
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={24} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                Expert Teacher
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn from qualified educator
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Globe" size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                Open Access
              </h3>
              <p className="text-sm text-muted-foreground">
                No barriers to education
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
