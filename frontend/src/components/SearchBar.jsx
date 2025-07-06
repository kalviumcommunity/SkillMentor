// src/components/SearchBar.jsx
import React, { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search triggered for:", query);
    // Add logic to filter mentors/students
  };

  return (
    <div className="flex gap-2 justify-center mb-10">
      <input
        type="text"
        placeholder="Search by mentor or subject..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-2/3"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
