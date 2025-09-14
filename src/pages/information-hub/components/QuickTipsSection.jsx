import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickTipsSection = () => {
  const tips = [
    {
      id: 1,
      icon: "Lightbulb",
      title: "Bookmark Important Topics",
      description: "Use your browser\'s bookmark feature to save frequently accessed notes and videos for quick reference."
    },
    {
      id: 2,
      icon: "Zap",
      title: "Use Keyboard Shortcuts",
      description: "Press Ctrl+F (Cmd+F on Mac) to quickly search within any page content for specific terms or concepts."
    },
    {
      id: 3,
      icon: "Target",
      title: "Start with Basics",
      description: "If you're new to a topic, begin with foundational notes before moving to advanced materials and videos."
    },
    {
      id: 4,
      icon: "Clock",
      title: "Regular Study Schedule",
      description: "Visit regularly to discover new content. We continuously update our notes and video collections."
    },
    {
      id: 5,
      icon: "Download",
      title: "Offline Access",
      description: "Download notes to your device for offline studying when you don't have internet access."
    },
    {
      id: 6,
      icon: "Monitor",
      title: "Multi-Device Learning",
      description: "Your theme preferences sync across devices. Start on desktop and continue on mobile seamlessly."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
          Quick Tips for Better Learning
        </h2>
        <p className="text-muted-foreground">
          Maximize your learning experience with these helpful tips and best practices.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tips?.map((tip) => (
          <div key={tip?.id} className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-smooth">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name={tip?.icon} size={16} color="var(--color-accent-foreground)" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">
                  {tip?.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickTipsSection;