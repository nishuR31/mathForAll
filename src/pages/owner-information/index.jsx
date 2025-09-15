import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import PersonalIntroSection from "./components/PersonalIntroSection";
import BackgroundSection from "./components/BackgroundSection";
import VisionMissionSection from "./components/VisionMissionSection";
import JourneySection from "./components/JourneySection";
import ContactSection from "./components/ContactSection";
import Image from "components/AppImage";

const OwnerInformation = () => {
  return (
    <>
      <Helmet>
        <title>
          About the Founder - Dr. Samir Kumar Pandey | Mathematics for All
        </title>
        <meta
          name="description"
          content="Meet Dr. Samir Kumar Pandey, founder of Mathematics for All. Learn about his educational background, vision for accessible mathematics education, and the journey behind this free learning platform."
        />
        <meta
          name="keywords"
          content="mathematics education, free learning, educational platform founder, math teacher, accessible education"
        />
        <meta
          property="og:title"
          content="About the Founder - Dr. Samir Kumar Pandey | Mathematics for All"
        />
        <meta
          property="og:description"
          content="Discover the story behind Maths for All and meet the passionate educator dedicated to making mathematics accessible to everyone."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/owner-information" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          <PersonalIntroSection />
          <BackgroundSection />
          <VisionMissionSection />
          <JourneySection />
          <ContactSection />
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-background py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-transparent rounded-lg flex items-center justify-center">
                  <span className="text-transparent bg-transparent font-bold text-sm">
                    <Image src="/assets/images/logo.png"></Image>
                  </span>
                </div>
                <span className="font-heading font-semibold text-lg">
                  Mathematics for All
                </span>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Democratizing mathematics education, one student at a time.
              </p>
              <p className="text-xs opacity-60">
                © {new Date()?.getFullYear()} Mathematics for All. Created with
                ❤️ for free education.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default OwnerInformation;
