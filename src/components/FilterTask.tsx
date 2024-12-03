import React, { useState } from "react";

interface FilterTaskProps {
  setFilter: (filter: string) => void;
}

const FilterTask: React.FC<FilterTaskProps> = ({ setFilter }) => {
  const [filter, setLocalFilter] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalFilter(value);
    setFilter(value);
  };

  return (
    <input
      type="text"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Filter tasks by title"
    />
  );
};

export default FilterTask;
