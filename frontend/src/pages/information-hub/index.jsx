import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FAQSection from './components/FAQSection';
import UsageGuideSection from './components/UsageGuideSection';
import QuickTipsSection from './components/QuickTipsSection';
import ContactSupportSection from './components/ContactSupportSection';
import Icon from '../../components/AppIcon';

const InformationHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Information Hub - Help & FAQ | Maths for All</title>
        <meta name="description" content="Find answers to frequently asked questions and detailed usage instructions for the Maths for All platform. Get help with downloading notes, watching videos, and using all features." />
        <meta name="keywords" content="help, FAQ, usage guide, mathematics learning, platform help, instructions" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                  <Icon name="HelpCircle" size={32} color="white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-6">
                  Information Hub
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Your comprehensive resource center for frequently asked questions, 
                  detailed usage instructions, and helpful tips to maximize your learning experience 
                  on the Maths for All platform.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Icon name="BookOpen" size={16} className="mr-2 text-primary" />
                    Comprehensive FAQ
                  </div>
                  <div className="flex items-center">
                    <Icon name="Navigation" size={16} className="mr-2 text-primary" />
                    Step-by-step Guides
                  </div>
                  <div className="flex items-center">
                    <Icon name="Lightbulb" size={16} className="mr-2 text-primary" />
                    Learning Tips
                  </div>
                  <div className="flex items-center">
                    <Icon name="Users" size={16} className="mr-2 text-primary" />
                    Support Resources
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 space-y-20">
            {/* FAQ Section */}
            <section>
              <FAQSection />
            </section>

            {/* Usage Guide Section */}
            <section>
              <UsageGuideSection />
            </section>

            {/* Quick Tips Section */}
            <section>
              <QuickTipsSection />
            </section>

            {/* Contact Support Section */}
            <section>
              <ContactSupportSection />
            </section>
          </div>

          {/* Bottom CTA Section */}
          <section className="bg-muted/30 py-16">
            <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Now that you know how to use our platform effectively, dive into our extensive 
                collection of mathematics notes and educational videos.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/notes-library" 
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth font-medium"
                >
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Browse Notes
                </a>
                <a 
                  href="/video-learning-center" 
                  className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-medium"
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  Watch Videos
                </a>
                <a 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-smooth font-medium"
                >
                  <Icon name="Home" size={20} className="mr-2" />
                  Go to Home
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-30 h-30 bg-primary rounded-lg flex items-center justify-center">
                  <img src="/assets/images/samirsir.JPG" alt='Mathematics for all' />
                </div>
                <span className="font-heading font-semibold text-lg text-card-foreground">
                  Mathematics for All
                </span>
              </div>
              <div className="text-center md:text-right">
                <p className="text-muted-foreground text-sm">
                  © {new Date()?.getFullYear()} Mathematics for All. Free mathematics education for everyone.
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  Last updated: September 2025
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InformationHub;