import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SortControls = ({ sortBy, sortOrder, onSortChange, onOrderChange }) => {
  const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'difficulty', label: 'Difficulty Level' },
    { value: 'category', label: 'Category' },
    { value: 'dateAdded', label: 'Recently Added' }
  ];

  const orderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          className="w-full"
        />
      </div>
      <div className="flex-1">
        <Select
          label="Order"
          options={orderOptions}
          value={sortOrder}
          onChange={onOrderChange}
          className="w-full"
        />
      </div>
      <div className="flex items-end">
        <Button
          variant="outline"
          size="default"
          iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
          onClick={() => onOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="h-10"
        >
          <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SortControls;