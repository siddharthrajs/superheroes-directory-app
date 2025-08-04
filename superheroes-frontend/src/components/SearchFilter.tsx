import { useState } from 'react';
import type { SuperheroFilters } from '../types/superhero';

interface SearchFilterProps {
  filters: SuperheroFilters;
  onFiltersChange: (filters: SuperheroFilters) => void;
  onAddNew: () => void;
}

export default function SearchFilter({ filters, onFiltersChange, onAddNew }: SearchFilterProps) {
  const [searchInput, setSearchInput] = useState(filters.search || '');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, search: searchInput.trim() || undefined });
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    // Clear search if input is empty
    if (!value.trim()) {
      onFiltersChange({ ...filters, search: undefined });
    }
  };

  const handleAlignmentChange = (alignment: string) => {
    onFiltersChange({ 
      ...filters, 
      alignment: alignment === '' ? undefined : alignment as 'hero' | 'villain'
    });
  };

  const handleUniverseChange = (universe: string) => {
    onFiltersChange({ 
      ...filters, 
      universe: universe === '' ? undefined : universe as 'marvel' | 'dc' | 'other'
    });
  };

  const clearAllFilters = () => {
    setSearchInput('');
    onFiltersChange({});
  };

  const hasActiveFilters = filters.search || filters.alignment || filters.universe;

  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full lg:w-auto">
          <div className="join w-full">
            <input
              type="text"
              placeholder="Search superheroes..."
              className="input input-bordered join-item flex-1"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <button type="submit" className="btn btn-primary join-item">
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Alignment Filter */}
          <select
            className="select select-bordered select-sm"
            value={filters.alignment || ''}
            onChange={(e) => handleAlignmentChange(e.target.value)}
          >
            <option value="">All Alignments</option>
            <option value="hero">Heroes</option>
            <option value="villain">Villains</option>
          </select>

          {/* Universe Filter */}
          <select
            className="select select-bordered select-sm"
            value={filters.universe || ''}
            onChange={(e) => handleUniverseChange(e.target.value)}
          >
            <option value="">All Universes</option>
            <option value="marvel">Marvel</option>
            <option value="dc">DC</option>
            <option value="other">Other</option>
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={clearAllFilters}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Add New Button */}
        <button
          className="btn btn-success"
          onClick={onAddNew}
        >
          Add New Superhero
        </button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm opacity-70">Active filters:</span>
          {filters.search && (
            <div className="badge badge-primary">
              Search: "{filters.search}"
            </div>
          )}
          {filters.alignment && (
            <div className="badge badge-secondary">
              {filters.alignment === 'hero' ? 'Heroes' : 'Villains'}
            </div>
          )}
          {filters.universe && (
            <div className="badge badge-accent">
              {filters.universe.toUpperCase()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}