import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ video, onClose }) => {
  if (!video) return null;

  const getYouTubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevated">
      <div className="relative">
        <div className="aspect-video">
          <iframe
            src={getYouTubeEmbedUrl(video?.videoId)}
            title={video?.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 bg-background/80 hover:bg-background text-foreground"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
              {video?.title}
            </h2>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="User" size={16} />
                <span>{video?.instructor}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={16} />
                <span>{video?.views?.toLocaleString()} views</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{Math.floor(video?.duration / 60)} min</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              video?.difficulty === 'Beginner' ? 'bg-success text-success-foreground' :
              video?.difficulty === 'Intermediate' ? 'bg-warning text-warning-foreground' :
              'bg-error text-error-foreground'
            }`}>
              {video?.difficulty}
            </span>
          </div>
        </div>
        
        <p className="text-foreground mb-4 leading-relaxed">
          {video?.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {video?.tags?.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;