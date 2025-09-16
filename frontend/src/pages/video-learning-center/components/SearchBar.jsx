import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit, onClearSearch }) => {
  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="text-center mb-6">
        <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
          Discover Mathematics Videos
        </h2>
        <p className="text-muted-foreground">
          Search through our curated collection of educational mathematics content
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search for algebra, calculus, geometry..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-12 pr-10"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>
        
        <Button 
          type="submit" 
          variant="default"
          iconName="Search"
          iconPosition="left"
          className="sm:w-auto w-full"
        >
          Search Videos
        </Button>
      </form>
      {searchTerm && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Searching for: <span className="font-medium text-foreground">"{searchTerm}"</span>
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSearch}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;