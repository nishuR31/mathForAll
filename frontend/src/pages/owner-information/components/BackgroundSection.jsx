import React from 'react';
import Icon from '../../../components/AppIcon';

const BackgroundSection = () => {
  const achievements = [
    {
      icon: "Award",
      title: "Excellence in Teaching Award",
      description: "Received the National Mathematics Teaching Excellence Award in 2019 for innovative teaching methods.",
      year: "2019"
    },
    {
      icon: "BookOpen",
      title: "Published Research",
      description: "Author of 12 peer-reviewed papers on mathematics education and learning methodologies.",
      year: "2015-2023"
    },
    {
      icon: "Users",
      title: "Student Impact",
      description: "Directly taught over 5,000 students across various educational levels and institutions.",
      year: "2008-2023"
    },
    {
      icon: "Globe",
      title: "International Speaker",
      description: "Keynote speaker at mathematics education conferences in 15 countries worldwide.",
      year: "2016-2023"
    }
  ];

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Educational Background & Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My journey in mathematics education spans over two decades, from classroom teaching to educational research and platform development.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>
            
            <div className="space-y-12">
              {/* Education */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-background p-6 rounded-lg shadow-soft border border-border">
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                      Ph.D. in Mathematics Education
                    </h3>
                    <p className="text-primary font-medium mb-2">Stanford University</p>
                    <p className="text-muted-foreground">
                      Specialized in cognitive learning theories and digital mathematics pedagogy. 
                      Dissertation focused on accessibility in mathematics education.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                <div className="flex-1 pl-8">
                  <span className="text-sm text-muted-foreground font-medium">2005 - 2008</span>
                </div>
              </div>

              {/* Teaching Career */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8">
                  <span className="text-sm text-muted-foreground font-medium">2008 - 2020</span>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-success rounded-full border-4 border-background"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-background p-6 rounded-lg shadow-soft border border-border">
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                      Professor of Mathematics
                    </h3>
                    <p className="text-success font-medium mb-2">UC Berkeley & MIT</p>
                    <p className="text-muted-foreground">
                      Taught undergraduate and graduate mathematics courses. Developed innovative 
                      teaching methodologies that improved student engagement by 40%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform Creation */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-background p-6 rounded-lg shadow-soft border border-border">
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                      Maths for All Platform
                    </h3>
                    <p className="text-accent font-medium mb-2">Founder & Creator</p>
                    <p className="text-muted-foreground">
                      Launched this free educational platform to democratize mathematics education 
                      and reach students worldwide who lack access to quality resources.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
                <div className="flex-1 pl-8">
                  <span className="text-sm text-muted-foreground font-medium">2020 - Present</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements?.map((achievement, index) => (
            <div key={index} className="bg-background p-6 rounded-lg shadow-soft border border-border hover:shadow-elevated transition-smooth">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name={achievement?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">
                {achievement?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {achievement?.description}
              </p>
              <span className="text-xs text-primary font-medium">
                {achievement?.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;