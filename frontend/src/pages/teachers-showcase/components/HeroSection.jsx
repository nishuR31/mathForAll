import React from 'react';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-8 mb-8">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Users" size={32} color="white" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Meet Our Expert Mathematics Teacher
        </h1>
        
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Our dedicated ,qualified mathematics educator brings years of experience and passion for teaching. 
          He specializes in different areas of mathematics, ensuring comprehensive coverage of all topics 
          from basic arithmetic to advanced calculus.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-secondary">
          <div className="flex items-center">
            <Icon name="Award" size={16} className="mr-2 text-primary" />
            <span>Certified </span>
          </div>
          <div className="flex items-center">
            <Icon name="BookOpen" size={16} className="mr-2 text-success" />
            <span>Subject Specialists</span>
          </div>
          <div className="flex items-center">
            <Icon name="Heart" size={16} className="mr-2 text-accent" />
            <span>Passionate </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;