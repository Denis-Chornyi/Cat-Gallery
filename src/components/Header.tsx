import React from "react";
import { Cat as CatIcon, Heart } from "lucide-react";
import BreedSelect from "./BreedSelect";
import clsx from "clsx";

type HeaderProps = {
  favorites: string[];
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
  selectedBreed: string;
  setSelectedBreed: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({
  showFavorites,
  setShowFavorites,
  selectedBreed,
  setSelectedBreed,
  favorites,
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CatIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Cat Gallery</h1>
          </div>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={clsx(
              "flex items-center space-x-2 px-4 py-2 rounded-lg",
              "transition-all duration-200",
              showFavorites
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <Heart
              className={clsx(
                "w-5 h-5",
                showFavorites ? "fill-red-500 stroke-red-500" : ""
              )}
            />
            <span>
              {showFavorites ? "Showing Favorites" : "Show Favorites"}
              {favorites.length > 0 && ` (${favorites.length})`}
            </span>
          </button>
        </div>
        {!showFavorites && (
          <div className="mt-6">
            <BreedSelect value={selectedBreed} onChange={setSelectedBreed} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
