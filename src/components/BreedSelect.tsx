import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBreeds } from "../lib/api";

type BreedSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const BreedSelect: React.FC<BreedSelectProps> = ({ value, onChange }) => {
  const { data: breeds, isLoading } = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
  });

  if (isLoading) return <div>Loading breeds...</div>;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Select a breed"
      className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Breeds</option>
      {breeds?.map((breed) => (
        <option key={breed.id} value={breed.id}>
          {breed.name}
        </option>
      ))}
    </select>
  );
};

export default React.memo(BreedSelect);
