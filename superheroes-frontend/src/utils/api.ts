import type { Superhero, CreateSuperheroData, UpdateSuperheroData, SuperheroFilters } from '../types/superhero';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiError extends Error {
  public status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new ApiError(response.status, errorData.message || 'An error occurred');
  }
  return response.json();
};

export const superheroApi = {
  // Get all superheroes with optional filters
  getAll: async (filters?: SuperheroFilters): Promise<Superhero[]> => {
    const params = new URLSearchParams();
    
    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.alignment) {
      params.append('alignment', filters.alignment);
    }
    if (filters?.universe) {
      params.append('universe', filters.universe);
    }

    const url = `${API_BASE_URL}/superheroes${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Get superhero by ID
  getById: async (id: string): Promise<Superhero> => {
    const response = await fetch(`${API_BASE_URL}/superheroes/${id}`);
    return handleResponse(response);
  },

  // Create new superhero
  create: async (data: CreateSuperheroData): Promise<Superhero> => {
    const response = await fetch(`${API_BASE_URL}/superheroes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Update superhero
  update: async (id: string, data: CreateSuperheroData): Promise<Superhero> => {
    const response = await fetch(`${API_BASE_URL}/superheroes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Delete superhero
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/superheroes/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  },
};

export { ApiError };