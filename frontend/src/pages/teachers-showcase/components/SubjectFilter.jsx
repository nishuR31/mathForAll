import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubjectFilter = ({ subjects, activeFilter, onFilterChange }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Filter" size={20} className="mr-2 text-primary" />
        Filter by Subject
      </h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('all')}
          className="mb-2"
        >
          All Subjects
        </Button>
        
        {subjects?.map((subject) => (
          <Button
            key={subject}
            variant={activeFilter === subject ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange(subject)}
            className="mb-2"
          >
            {subject}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubjectFilter;