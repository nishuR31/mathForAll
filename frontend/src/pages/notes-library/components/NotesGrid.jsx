import React from 'react';
import NoteCard from './NoteCard';
import Icon from '../../../components/AppIcon';


const NotesGrid = ({ notes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-16 bg-muted rounded mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (notes?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="BookOpen" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          No notes found
        </h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes?.map((note) => (
        <NoteCard key={note?.id} note={note} />
      ))}
    </div>
  );
};

export default NotesGrid;