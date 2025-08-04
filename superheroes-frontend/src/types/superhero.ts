export interface Superhero {
  _id: string;
  name: string;
  realName: string;
  powers: string[];
  originStory: string;
  imageUrl: string;
  alignment: 'hero' | 'villain';
  universe: 'marvel' | 'dc' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface CreateSuperheroData {
  name: string;
  realName: string;
  powers: string[];
  originStory: string;
  imageUrl: string;
  alignment: 'hero' | 'villain';
  universe: 'marvel' | 'dc' | 'other';
}

export interface UpdateSuperheroData extends CreateSuperheroData {
  _id: string;
}

export interface SuperheroFilters {
  search?: string;
  alignment?: 'hero' | 'villain' | '';
  universe?: 'marvel' | 'dc' | 'other' | '';
}