import axios from 'axios';
import { Cat, Breed } from '../types/cat';

const API_KEY = "live_WpbwBeGlUafnU9y55AttVtQwIFutoA23gFuhTeFSaylyRMaZMdw3dREfQYVKTT2k";
const BASE_URL = 'https://api.thecatapi.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

export const fetchCats = async (breedId?: string): Promise<Cat[]> => {
  const params = {
    limit: 20,
    has_breeds: 1,
    ...(breedId ? { breed_ids: breedId } : {}),
  };

  const { data } = await api.get<Cat[]>('/images/search', { params });
  return data;
};

export const fetchCatsByIds = async (ids: string[]): Promise<Cat[]> => {
  if (ids.length === 0) return [];
  
  const promises = ids.map(id => 
    api.get<Cat>(`/images/${id}`).then(response => response.data)
  );
  
  return Promise.all(promises);
};

export const fetchBreeds = async (): Promise<Breed[]> => {
  const { data } = await api.get<Breed[]>('/breeds');
  return data;
};