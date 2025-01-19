import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { fetchCats, fetchCatsByIds } from "./lib/api";
import CatCard from "./components/CatCard";

import { useFavoritesStore } from "./store/favorites";
import Header from "./components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const CatGallery = () => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavoritesStore();

  const { data: breedCats = [], isLoading: isLoadingBreed } = useQuery({
    queryKey: ["cats", selectedBreed],
    queryFn: () => fetchCats(selectedBreed),
    enabled: !showFavorites,
  });

  const { data: favoriteCats = [], isLoading: isLoadingFavorites } = useQuery({
    queryKey: ["favorite-cats", favorites],
    queryFn: () => fetchCatsByIds(favorites),
    enabled: showFavorites && favorites.length > 0,
  });

  const displayedCats = showFavorites ? favoriteCats : breedCats;
  const isLoading = showFavorites ? isLoadingFavorites : isLoadingBreed;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        favorites={favorites}
        setSelectedBreed={setSelectedBreed}
        selectedBreed={selectedBreed}
      />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : displayedCats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCats.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {showFavorites
                ? "You haven't added any cats to your favorites yet!"
                : "No cats found for the selected breed."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CatGallery />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
