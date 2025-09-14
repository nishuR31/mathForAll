import React from 'react';
import Icon from '../../../components/AppIcon';

const TopicCard = ({ topic, onClick, isActive }) => {
  const getTopicIcon = (topicName) => {
    const iconMap = {
      'Algebra': 'Calculator',
      'Calculus': 'TrendingUp',
      'Geometry': 'Square',
      'Trigonometry': 'Triangle',
      'Statistics': 'BarChart3',
      'Probability': 'Dice6',
      'Linear Algebra': 'Grid3X3',
      'Differential Equations': 'Waves',
      'Number Theory': 'Hash',
      'Discrete Mathematics': 'Network'
    };
    return iconMap?.[topicName] || 'BookOpen';
  };

  return (
    <div 
      className={`p-4 rounded-2xl border cursor-pointer transition-smooth hover:shadow-soft ${
        isActive 
          ? 'bg-primary text-primary-foreground border-primary shadow-soft' 
          : 'bg-card text-card-foreground border-border hover:border-primary/50'
      }`}
      onClick={() => onClick(topic)}
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
          isActive ? 'bg-primary-foreground/20' : 'bg-muted'
        }`}>
          <Icon 
            name={getTopicIcon(topic?.name)} 
            size={20} 
            className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-sm">
            {topic?.name}
          </h3>
          <p className={`text-xs ${
            isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
          }`}>
            {topic?.videoCount} videos
          </p>
        </div>
      </div>
      <p className={`text-xs leading-relaxed ${
        isActive ? 'text-primary-foreground/90' : 'text-muted-foreground'
      }`}>
        {topic?.description}
      </p>
    </div>
  );
};

export default TopicCard;