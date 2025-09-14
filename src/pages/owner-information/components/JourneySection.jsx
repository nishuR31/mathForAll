import React from 'react';
import Icon from '../../../components/AppIcon';

const JourneySection = () => {
  const milestones = [
    {
      year: "2020",
      title: "The Idea",
      description: "During the pandemic, I noticed many students struggling with online learning. This sparked the idea for a truly accessible mathematics platform.",
      icon: "Lightbulb",
      color: "text-yellow-500"
    },
    {
      year: "2021",
      title: "First Launch",
      description: "Launched the initial version with 50 study notes and basic video content. The response from the community was overwhelmingly positive.",
      icon: "Rocket",
      color: "text-blue-500"
    },
    {
      year: "2022",
      title: "Global Reach",
      description: "Expanded content to cover advanced topics and reached students in over 80 countries. Added multilingual support for better accessibility.",
      icon: "Globe",
      color: "text-green-500"
    },
    {
      year: "2023",
      title: "Community Growth",
      description: "Built a community of volunteer educators and reached 50,000+ students. Introduced interactive features and mobile optimization.",
      icon: "Users",
      color: "text-purple-500"
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Planning AI-powered personalized learning paths and expanding to other STEM subjects while maintaining our free access commitment.",
      icon: "Sparkles",
      color: "text-pink-500"
    }
  ];

  const challenges = [
    {
      challenge: "Funding Sustainability",
      solution: "Established partnerships with educational foundations and implemented a transparent donation system.",
      icon: "DollarSign"
    },
    {
      challenge: "Content Quality Control",
      solution: "Created a peer review system with volunteer educators to ensure all materials meet high standards.",
      icon: "Shield"
    },
    {
      challenge: "Technical Infrastructure",
      solution: "Partnered with cloud providers offering educational discounts to maintain reliable, fast access globally.",
      icon: "Server"
    }
  ];

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            The Platform Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From a simple idea during challenging times to a global educational platform 
            serving thousands of students worldwide.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="flex justify-between items-center mb-8">
                {milestones?.map((milestone, index) => (
                  <div key={index} className="flex flex-col items-center relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      index === milestones?.length - 1 ? 'bg-primary' : 'bg-background border-2 border-primary'
                    }`}>
                      <Icon 
                        name={milestone?.icon} 
                        size={24} 
                        className={index === milestones?.length - 1 ? 'text-white' : 'text-primary'} 
                      />
                    </div>
                    <div className="text-center max-w-48">
                      <div className="text-sm font-bold text-primary mb-2">{milestone?.year}</div>
                      <h3 className="font-heading font-semibold text-foreground mb-2 text-sm">
                        {milestone?.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {milestone?.description}
                      </p>
                    </div>
                    {index < milestones?.length - 1 && (
                      <div className="absolute top-8 left-full w-full h-0.5 bg-border -translate-y-1/2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-8">
              {milestones?.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                    index === milestones?.length - 1 ? 'bg-primary' : 'bg-background border-2 border-primary'
                  }`}>
                    <Icon 
                      name={milestone?.icon} 
                      size={20} 
                      className={index === milestones?.length - 1 ? 'text-white' : 'text-primary'} 
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary mb-1">{milestone?.year}</div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      {milestone?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges & Solutions */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
              Challenges & Solutions
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building a sustainable free education platform came with unique challenges. 
              Here's how we addressed them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges?.map((item, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-soft border border-border">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={item?.icon} size={24} className="text-error" />
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-3">
                  Challenge: {item?.challenge}
                </h4>
                <div className="w-8 h-0.5 bg-success mb-3"></div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-success">Solution:</span> {item?.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Target" size={28} color="white" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
              Looking Ahead
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our journey is far from over. We're committed to continuous innovation while 
              staying true to our core mission of providing free, accessible mathematics 
              education. The future holds exciting possibilities for personalized learning, 
              expanded content, and even greater global impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;