import React from 'react';
import Icon from '../../../components/AppIcon';

const UsageGuideSection = () => {
  const guideSteps = [
    {
      id: 1,
      title: "Getting Started with Mathematics for All",
      icon: "Home",
      steps: [
        "Visit the Home page to see featured notes and videos",
        "Use the search bar in the header to find specific topics",
        "Navigate using the main menu: Home, Notes, Videos, Teachers, About, Help",
        "Toggle between light and dark themes using the theme button",
        "All content is free and requires no registration"
      ]
    },
    {
      id: 2,
      title: "Browsing and Downloading Notes",
      icon: "BookOpen",
      steps: [
        "Click on \'Notes\' in the main navigation menu",
        "Browse through categorized mathematics topics",
        "Each note card shows title, description, and subject area",
        "Click the \'Download\' button to access the Google Drive link",
        "Save the PDF file directly to your device",
        "Notes are organized by difficulty level and topic"
      ]
    },
    {
      id: 3,
      title: "Watching Educational Videos",
      icon: "Play",
      steps: [
        "Navigate to the \'Videos\' section from the main menu",
        "Use the search functionality to find specific topics",
        "Browse recommended video categories (Algebra, Calculus, etc.)",
        "Click on any video thumbnail to start watching",
        "Videos play directly in your browser via YouTube embedding",
        "Use fullscreen mode for better viewing experience"
      ]
    },
    {
      id: 4,
      title: "Using Search Effectively",
      icon: "Search",
      steps: [
        "Use the global search bar located in the header",
        "Type mathematical terms or topic names",
        "Search works across both notes and videos simultaneously",
        "Results filter in real-time as you type",
        "Use specific terms like 'quadratic equations' or 'derivatives'",
        "Search state is preserved when navigating between pages"
      ]
    },
    {
      id: 5,
      title: "Mobile Device Usage",
      icon: "Smartphone",
      steps: [
        "Access the mobile menu using the hamburger icon (≡)",
        "All features are optimized for touch interaction",
        "Videos automatically adjust for mobile viewing",
        "Search functionality works the same on mobile",
        "Theme toggle is available in the mobile menu",
        "Portrait and landscape orientations are both supported"
      ]
    },
    {
      id: 6,
      title: "Exploring Teacher Profiles",
      icon: "Users",
      steps: [
        "Visit the \'Teachers\' section to learn about our educators",
        "View teacher photos, biographies, and specializations",
        "Understand which subjects each teacher focuses on",
        "Learn about teaching experience and qualifications",
        "Teachers have curated all the notes and video content",
        "Use teacher specializations to find relevant content"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-heading font-semibold text-foreground mb-4">
          Platform Usage Guide
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Step-by-step instructions to help you navigate and make the most of our mathematics learning platform. 
          Follow these guides to become proficient with all available features.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {guideSteps?.map((guide) => (
          <div key={guide?.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-elevated transition-smooth">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Icon name={guide?.icon} size={20} color="white" />
              </div>
              <h3 className="text-lg font-heading font-medium text-card-foreground">
                {guide?.title}
              </h3>
            </div>
            
            <ol className="space-y-2">
              {guide?.steps?.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageGuideSection;