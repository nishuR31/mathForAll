import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PersonalIntroSection = () => {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-80 h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-elevated">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Dr. Michael Thompson - Founder of Maths for All"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-elevated">
                <Icon name="Heart" size={24} color="white" />
              </div>
            </div>
          </div>

          {/* Introduction Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Platform Founder
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Meet Dr. Samir Kumar pandey
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Welcome to Maths for All! I'm Dr. Samir, a passionate mathematics educator with over 15 years of teaching experience. My mission is simple: make quality mathematics education accessible to everyone, everywhere, completely free of charge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center text-muted-foreground">
                <Icon name="GraduationCap" size={20} className="mr-2 text-primary" />
                <span>Ph.D. in Mathematics Education</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Icon name="MapPin" size={20} className="mr-2 text-primary" />
                <span>Stanford University</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalIntroSection;