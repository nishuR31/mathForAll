import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search notes by title, topic, or subject..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10 pr-4"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;