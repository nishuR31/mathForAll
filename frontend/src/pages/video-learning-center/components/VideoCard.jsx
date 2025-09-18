import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const VideoCard = ({ video, onClick }) => {
  console.table(video);

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-success text-success-foreground";
      case "Intermediate":
        return "bg-warning text-warning-foreground";
      case "Advanced":
        return "bg-error text-error-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth cursor-pointer group"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video?.thumbnail}
          alt={video?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-smooth flex items-center justify-center">
          <div className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
            <Icon name="Play" size={20} color="white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
          {<div dangerouslySetInnerHTML={{ __html: video?.title }} />}
        </h3>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {video?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {video?.instructor}
            </span>
          </div>


          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date(video?.publishedAt).toDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
