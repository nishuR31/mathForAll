import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      icon: "BookOpen",
      value: "10+",
      label: "Study Notes",
      description: "Comprehensive materials across all math topics"
    },
    {
      icon: "Play",
      value: "20+",
      label: "Video Lessons",
      description: "Hours of engaging educational content"
    },
    {
      icon: "Users",
      value: "1",
      label: "Expert Teacher",
      description: "Qualified educator with years of experience"
    },
    {
      icon: "Download",
      value: "1K+",
      label: "Downloads",
      description: "Students have accessed our resources"
    },
    {
      icon: "Globe",
      value: "2+",
      label: "Countries",
      description: "Students learning worldwide"
    },
    {
      icon: "Award",
      value: "100%",
      label: "Free Access",
      description: "No hidden costs or premium barriers"
    }
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we're making mathematics education accessible to learners everywhere
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                <Icon name={stat?.icon} size={32} className="text-primary" />
              </div>
              
              <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {stat?.value}
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {stat?.label}
              </h3>
              
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                {stat?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card border border-border rounded-lg p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-l animate-spin from-muted via-primary to-muted rounded-full flex items-center justify-center">
                {/* <Icon name="Heart" size={40} color="white" className="!animate-none" /> */}
              </div>
                <Icon name="Heart" size={40} color="white" className=" mt-5 absolute animate-none" />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
              Join Our Growing Community
            </h3>
            
            <p className="text-lg text-muted-foreground mb-6">
              Thousands of students worldwide are already benefiting from our free mathematics education platform. 
              Start your learning journey today and become part of our success story.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                No registration required
              </span>
              <span className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                Instant access to all content
              </span>
              <span className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                Regular content updates
              </span>
              <span className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                Mobile-friendly platform
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;