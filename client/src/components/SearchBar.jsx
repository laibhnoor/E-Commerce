import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
