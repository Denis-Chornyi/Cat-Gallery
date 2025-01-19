import { useQuery } from "@tanstack/react-query";
import { fetchCats, fetchCatsByIds } from "../lib/api";

export const useBreedCats = (selectedBreed: string, isEnabled: boolean) => {
  return useQuery({
    queryKey: ["cats", selectedBreed],
    queryFn: () => fetchCats(selectedBreed),
    enabled: isEnabled,
  });
};

export const useFavoriteCats = (favorites: string[], isEnabled: boolean) => {
  return useQuery({
    queryKey: ["favorite-cats", favorites],
    queryFn: () => fetchCatsByIds(favorites),
    enabled: isEnabled && favorites.length > 0,
  });
};
