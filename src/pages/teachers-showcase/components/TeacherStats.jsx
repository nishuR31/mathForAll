import React from 'react';
import Icon from '../../../components/AppIcon';

const TeacherStats = ({ stats }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
        <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
        Our Teacher
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {stats?.totalTeachers}
          </div>
          <div className="text-sm text-muted-foreground">
            Expert Teachers
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {stats?.totalExperience}+
          </div>
          <div className="text-sm text-muted-foreground">
            Years Combined
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-accent mb-1">
            {stats?.subjects}
          </div>
          <div className="text-sm text-muted-foreground">
            Math Subjects
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary mb-1">
            {stats?.qualifications}
          </div>
          <div className="text-sm text-muted-foreground">
            Advanced Degrees
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStats;