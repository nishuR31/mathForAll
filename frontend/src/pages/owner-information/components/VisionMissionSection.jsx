import React from 'react';
import Icon from '../../../components/AppIcon';

const VisionMissionSection = () => {
  const visionPoints = [
    {
      icon: "Target",
      title: "Universal Access",
      description: "Every student, regardless of economic background, should have access to high-quality mathematics education."
    },
    {
      icon: "Lightbulb",
      title: "Innovative Learning",
      description: "Combine traditional teaching methods with modern technology to create engaging learning experiences."
    },
    {
      icon: "Heart",
      title: "Passion-Driven",
      description: "Foster a love for mathematics by making it approachable, understandable, and enjoyable for all learners."
    }
  ];

  const principles = [
    "Free and open access to all educational content",
    "No registration barriers or hidden costs",
    "Quality content reviewed by education experts",
    "Inclusive design for diverse learning needs",
    "Continuous improvement based on user feedback",
    "Community-driven content development"
  ];

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Icon name="Eye" size={16} className="mr-2" />
            My Vision
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
            Democratizing Mathematics Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            I believe that mathematics is a universal language that should be accessible to everyone. 
            My vision is to break down the barriers that prevent students from accessing quality 
            mathematics education, whether those barriers are financial, geographical, or technological.
          </p>
        </div>

        {/* Vision Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {visionPoints?.map((point, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name={point?.icon} size={28} color="white" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                {point?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {point?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
              Mission Statement
            </h3>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          
          <blockquote className="text-xl lg:text-2xl text-center text-foreground font-medium leading-relaxed italic mb-8">
            "To provide free, comprehensive, and accessible mathematics education resources 
            that empower learners worldwide to achieve their academic goals and develop 
            a lifelong appreciation for mathematical thinking."
          </blockquote>
          
          <div className="flex justify-center">
            <div className="flex items-center text-muted-foreground">
              <Icon name="Quote" size={20} className="mr-2" />
              <span className="font-medium">Dr. Samir Kumar Pandey</span>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-6">
              Core Principles
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              These principles guide every decision I make in developing and maintaining 
              this platform. They ensure that Maths for All remains true to its mission 
              of providing accessible education for everyone.
            </p>
            
            <div className="space-y-4">
              {principles?.map((principle, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                  <p className="text-foreground">{principle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} color="white" />
              </div>
              <h4 className="text-xl font-heading font-semibold text-foreground">
                Community Impact
              </h4>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Students Reached</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-1">120+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Study Materials</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-error mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Free Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;