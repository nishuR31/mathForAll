import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NoteCard = ({ note }) => {
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-success text-success-foreground';
      case 'intermediate':
        return 'bg-warning text-warning-foreground';
      case 'advanced':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getFileTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'ppt': case'pptx':
        return 'Presentation';
      default:
        return 'File';
    }
  };

  const handleDownload = () => {
    window.open(note?.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2 line-clamp-2">
            {note?.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
            {note?.description}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <Icon 
            name={getFileTypeIcon(note?.fileType)} 
            size={24} 
            className="text-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(note?.difficulty)}`}>
          {note?.difficulty}
        </span>
        <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
          {note?.category}
        </span>
        <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
          {note?.fileType?.toUpperCase()}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Calendar" size={12} />
            <span>Added {formatDate(note?.dateAdded)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Download" size={12} />
            <span>{note?.downloadCount} downloads</span>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={handleDownload}
          iconName="Download"
          iconPosition="left"
          className="ml-4"
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;