import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ totalNotes, totalDownloads, categories, filteredCount }) => {
  const stats = [
    {
      label: 'Total Notes',
      value: totalNotes,
      icon: 'BookOpen',
      color: 'text-primary'
    },
    {
      label: 'Total Downloads',
      value: totalDownloads?.toLocaleString(),
      icon: 'Download',
      color: 'text-success'
    },
    {
      label: 'Categories',
      value: categories?.length,
      icon: 'Folder',
      color: 'text-warning'
    },
    {
      label: 'Showing',
      value: filteredCount,
      icon: 'Filter',
      color: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.label}</p>
              <p className="text-2xl font-heading font-bold text-card-foreground">
                {stat?.value}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;