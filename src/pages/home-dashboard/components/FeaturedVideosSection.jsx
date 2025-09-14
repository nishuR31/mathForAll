import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedVideosSection = () => {
  const featuredVideos = [
    {
      id: 1,
      title: "Introduction to Derivatives",
      topic: "Calculus",
      description: "Learn the fundamental concepts of derivatives with clear explanations and visual examples.",
      youtubeId: "WUvTyaaNkzM",
      duration: "15:42",
      views: "125K",
      difficulty: "Intermediate",
      tags: ["Calculus", "Derivatives", "Functions"]
    },
    {
      id: 2,
      title: "Matrix Multiplication Explained",
      topic: "Linear Algebra",
      description: "Step-by-step guide to understanding and performing matrix multiplication operations.",
      youtubeId: "XkY2DOUCWMU",
      duration: "12:18",
      views: "89K",
      difficulty: "Beginner",
      tags: ["Matrices", "Algebra", "Operations"]
    },
    {
      id: 3,
      title: "Trigonometric Identities",
      topic: "Trigonometry",
      description: "Master the essential trigonometric identities and their practical applications.",
      youtubeId: "kYW9MIhXDN4",
      duration: "18:35",
      views: "156K",
      difficulty: "Advanced",
      tags: ["Trigonometry", "Identities", "Proofs"]
    },
    {
      id: 4,
      title: "Quadratic Equations Solutions",
      topic: "Algebra",
      description: "Multiple methods for solving quadratic equations including factoring and the quadratic formula.",
      youtubeId: "VOHHZHNBhGM",
      duration: "14:27",
      views: "203K",
      difficulty: "Intermediate",
      tags: ["Algebra", "Quadratic", "Equations"]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Popular Video Lessons
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engaging video content that makes complex mathematical concepts easy to understand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredVideos?.map((video) => (
            <div key={video?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth">
              <div className="relative aspect-video bg-muted">
                <img 
                  src={`https://img.youtube.com/vi/${video?.youtubeId}/maxresdefault.jpg`}
                  alt={video?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-smooth">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Play" size={24} color="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video?.duration}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {video?.topic}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video?.difficulty)}`}>
                    {video?.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
                  {video?.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {video?.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center">
                    <Icon name="Eye" size={14} className="mr-1" />
                    {video?.views} views
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {video?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link to={`/video-learning-center?v=${video?.youtubeId}`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    className="w-full"
                  >
                    Watch Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/video-learning-center">
            <Button 
              variant="outline" 
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explore All Videos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideosSection;