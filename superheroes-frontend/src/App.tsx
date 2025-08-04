import { useState, useEffect } from 'react';
import SuperheroCard from './components/SuperheroCard';
import SuperheroForm from './components/SuperheroForm';
import ConfirmDialog from './components/ConfirmDialog';
import SearchFilter from './components/SearchFilter';
import { superheroApi, ApiError } from './utils/api';
import type { Superhero, CreateSuperheroData, SuperheroFilters } from './types/superhero';
import "./App.css";

function App() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SuperheroFilters>({});
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingSuperhero, setEditingSuperhero] = useState<Superhero | undefined>();
  const [formLoading, setFormLoading] = useState(false);
  
  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    superheroId: string;
    superheroName: string;
  }>({
    isOpen: false,
    superheroId: '',
    superheroName: ''
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch superheroes
  const fetchSuperheroes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await superheroApi.getAll(filters);
      setSuperheroes(data);
    } catch (err) {
      console.error('Error fetching superheroes:', err);
      setError(err instanceof ApiError ? err.message : 'Failed to fetch superheroes');
    } finally {
      setLoading(false);
    }
  };

  // Load superheroes on mount and when filters change
  useEffect(() => {
    fetchSuperheroes();
  }, [filters]);

  // Handle form submission (create/update)
  const handleFormSubmit = async (data: CreateSuperheroData) => {
    try {
      setFormLoading(true);
      setError(null);
      
      if (editingSuperhero) {
        await superheroApi.update(editingSuperhero._id, data);
      } else {
        await superheroApi.create(data);
      }
      
      await fetchSuperheroes();
      handleCloseForm();
    } catch (err) {
      console.error('Error saving superhero:', err);
      setError(err instanceof ApiError ? err.message : 'Failed to save superhero');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (superhero: Superhero) => {
    setEditingSuperhero(superhero);
    setShowForm(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    const superhero = superheroes.find(s => s._id === id);
    if (superhero) {
      setDeleteConfirm({
        isOpen: true,
        superheroId: id,
        superheroName: superhero.name
      });
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      setError(null);
      
      await superheroApi.delete(deleteConfirm.superheroId);
      await fetchSuperheroes();
      
      setDeleteConfirm({ isOpen: false, superheroId: '', superheroName: '' });
    } catch (err) {
      console.error('Error deleting superhero:', err);
      setError(err instanceof ApiError ? err.message : 'Failed to delete superhero');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSuperhero(undefined);
  };

  // Handle add new
  const handleAddNew = () => {
    setEditingSuperhero(undefined);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="navbar bg-primary text-primary-content">
        <div className="container mx-auto">
          <div className="flex-1">
            <h1 className="text-xl font-bold">Superheroes Directory</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <SearchFilter
          filters={filters}
          onFiltersChange={setFilters}
          onAddNew={handleAddNew}
        />

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setError(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm opacity-70">
                {superheroes.length} superhero{superheroes.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Superheroes Grid */}
            {superheroes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🦸</div>
                <h3 className="text-xl font-semibold mb-2">No superheroes found</h3>
                <p className="text-base-content/70 mb-4">
                  {Object.keys(filters).length > 0
                    ? 'Try adjusting your search filters or add a new superhero.'
                    : 'Get started by adding your first superhero!'
                  }
                </p>
                <button
                  className="btn btn-primary"
                  onClick={handleAddNew}
                >
                  Add First Superhero
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {superheroes.map((superhero) => (
                  <SuperheroCard
                    key={superhero._id}
                    superhero={superhero}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <SuperheroForm
          superhero={editingSuperhero}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          isLoading={formLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Superhero"
        message={`Are you sure you want to delete "${deleteConfirm.superheroName}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm({ isOpen: false, superheroId: '', superheroName: '' })}
        isLoading={deleteLoading}
      />
    </div>
  );
}

export default App;
