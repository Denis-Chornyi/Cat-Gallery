import React from "react";
import { Heart, Info, X } from "lucide-react";
import { Cat } from "../types/cat";
import { useFavoritesStore } from "../store/favorites";
import clsx from "clsx";

type CatCardProps = {
  cat: Cat;
};

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(cat.id);
  const breed = cat.breeds?.[0];
  const [showDetails, setShowDetails] = React.useState(false);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(cat.id);
    } else {
      addFavorite(cat.id);
    }
  };

  return (
    <div
      className={clsx(
        "relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300",
        "hover:scale-[1.02]",
        favorite && "ring-2 ring-green-500 ring-offset-2"
      )}
    >
      <img
        src={cat.url}
        alt={breed?.name || "Cat"}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <button
        onClick={toggleFavorite}
        className={clsx(
          "absolute top-4 right-4 p-2 rounded-full",
          "bg-white/90 shadow-lg transition-all",
          "hover:scale-110",
          favorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <Heart
          className={clsx(
            "w-6 h-6 transition-colors",
            favorite ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
          )}
        />
      </button>

      {breed && (
        <button
          onClick={() => setShowDetails(true)}
          className={clsx(
            "absolute top-16 right-4 p-2 rounded-full",
            "bg-white/90 shadow-lg transition-all",
            "hover:scale-110",
            "opacity-0 group-hover:opacity-100"
          )}
        >
          <Info className="w-6 h-6 text-blue-600" />
        </button>
      )}

      {breed && (
        <>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold">{breed.name}</h3>
            <p className="text-sm opacity-90">{breed.temperament}</p>
          </div>

          <div
            className={clsx(
              "absolute inset-0 bg-black/85 p-6 text-white transition-all duration-300",
              "flex flex-col overflow-y-auto",
              showDetails ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <h3 className="text-xl font-bold mb-2">{breed.name}</h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Origin:</strong> {breed.origin}
              </p>
              <p>
                <strong>Temperament:</strong> {breed.temperament}
              </p>
              <p>
                <strong>Description:</strong> {breed.description}
              </p>
              {breed.life_span && (
                <p>
                  <strong>Life Span:</strong> {breed.life_span} years
                </p>
              )}
              {breed.weight?.metric && (
                <p>
                  <strong>Weight:</strong> {breed.weight.metric} kg
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {favorite && (
        <div className="absolute top-4 left-4 px-2 py-1 bg-green-500 text-white text-sm rounded-full opacity-75">
          Favorite
        </div>
      )}
    </div>
  );
};

export default React.memo(CatCard);
