import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickAccessPanel = () => {
  const quickAccessItems = [
    {
      title: "Study Notes",
      description: "Download comprehensive notes",
      icon: "BookOpen",
      path: "/notes-library",
      color: "primary",
      stats: "150+ Notes"
    },
    {
      title: "Video Lessons",
      description: "Watch interactive tutorials",
      icon: "Play",
      path: "/video-learning-center",
      color: "accent",
      stats: "200+ Videos"
    },
    {
      title: "Meet Teachers",
      description: "Learn about our educators",
      icon: "Users",
      path: "/teachers-showcase",
      color: "success",
      stats: "12 Teachers"
    },
    {
      title: "Get Help",
      description: "FAQ and support resources",
      icon: "HelpCircle",
      path: "/information-hub",
      color: "warning",
      stats: "24/7 Support"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary': return 'bg-primary/10 text-primary hover:bg-primary/20';
      case 'accent': return 'bg-accent/10 text-accent hover:bg-accent/20';
      case 'success': return 'bg-success/10 text-success hover:bg-success/20';
      case 'warning': return 'bg-warning/10 text-warning hover:bg-warning/20';
      default: return 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Quick Access
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jump directly to the resources you need most
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickAccessItems?.map((item, index) => (
            <Link key={index} to={item?.path} className="group">
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-elevated transition-smooth group-hover:border-primary/20">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-smooth ${getColorClasses(item?.color)}`}>
                  <Icon name={item?.icon} size={32} />
                </div>
                
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-smooth">
                  {item?.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-3">
                  {item?.description}
                </p>
                
                <div className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                  {item?.stats}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={24} className="text-primary" />
            </div>
            
            <h3 className="text-2xl font-semibold text-card-foreground mb-3">
              Can't find what you're looking for?
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Use our global search to find specific topics, notes, or video lessons across all our educational content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="default"
                iconName="Search"
                iconPosition="left"
                onClick={() => {
                  const searchInput = document.querySelector('input[type="search"]');
                  if (searchInput) {
                    searchInput?.focus();
                  }
                }}
              >
                Start Searching
              </Button>
              
              <Link to="/information-hub">
                <Button 
                  variant="outline"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessPanel;