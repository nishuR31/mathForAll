import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactSupportSection = () => {
  const supportOptions = [
    {
      id: 1,
      title: "Browse More Help Topics",
      description: "Explore additional sections of our platform for more detailed information.",
      icon: "HelpCircle",
      action: "Stay on this page",
      actionType: "info"
    },
    {
      id: 2,
      title: "Meet Our Teachers",
      description: "Learn about the educators who create and curate our mathematics content.",
      icon: "Users",
      link: "/teachers-showcase",
      actionType: "link"
    },
    {
      id: 3,
      title: "About the Platform",
      description: "Discover the story behind Maths for All and our mission to provide free education.",
      icon: "Info",
      link: "/owner-information",
      actionType: "link"
    },
    {
      id: 4,
      title: "Return to Learning",
      description: "Go back to exploring our notes and videos to continue your mathematics journey.",
      icon: "Home",
      link: "/",
      actionType: "primary"
    }
  ];

  const technicalSpecs = [
    {
      category: "Browser Compatibility",
      items: ["Chrome 90+", "Firefox 88+", "Safari 14+", "Edge 90+"]
    },
    {
      category: "Device Support",
      items: ["Desktop computers", "Tablets (iPad, Android)", "Smartphones", "Chromebooks"]
    },
    {
      category: "Network Requirements",
      items: ["Stable internet for videos", "Minimal bandwidth for notes", "No VPN restrictions"]
    },
    {
      category: "Accessibility Features",
      items: ["Screen reader compatible", "Keyboard navigation", "High contrast themes", "Scalable text"]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
          Need Additional Help?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          If you couldn't find what you were looking for in our FAQ or usage guides, 
          here are additional resources and next steps you can take.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {supportOptions?.map((option) => (
          <div key={option?.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-soft transition-smooth">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={option?.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-medium text-card-foreground mb-2">
                  {option?.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {option?.description}
                </p>
                {option?.actionType === 'link' ? (
                  <Link to={option?.link}>
                    <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                      Visit Section
                    </Button>
                  </Link>
                ) : option?.actionType === 'primary' ? (
                  <Link to={option?.link}>
                    <Button variant="default" size="sm" iconName="ArrowRight" iconPosition="right">
                      Go to Home
                    </Button>
                  </Link>
                ) : (
                  <Button variant="ghost" size="sm" disabled>
                    Current Page
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-xl font-heading font-medium text-foreground mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-primary" />
          Technical Specifications
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {technicalSpecs?.map((spec, index) => (
            <div key={index}>
              <h4 className="font-medium text-foreground mb-2">{spec?.category}</h4>
              <ul className="space-y-1">
                {spec?.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Check" size={14} className="mr-2 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center bg-primary/5 rounded-lg p-6">
        <Icon name="Heart" size={32} className="mx-auto text-primary mb-3" />
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          Thank You for Using Maths for All
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We're committed to providing free, accessible mathematics education for everyone. 
          Happy learning!
        </p>
      </div>
    </div>
  );
};

export default ContactSupportSection;