import React from 'react';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, noteCounts }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('all')}
          className="text-xs"
        >
          All ({noteCounts?.all || 0})
        </Button>
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category?.id)}
            className="text-xs"
          >
            {category?.name} ({noteCounts?.[category?.id] || 0})
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;