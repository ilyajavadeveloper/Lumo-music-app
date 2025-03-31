import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import SongCard from '../components/SongCard';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Dummy search function – replace with your API call
  const handleSearch = (term) => {
    setSearchTerm(term);
    // For demonstration, let's assume it returns an empty array
    // Replace with your logic to fetch search results
    setResults([]);
  };

  return (
    <div className="p-6">
      <Searchbar onSearch={handleSearch} />
      <h2 className="text-3xl text-white font-bold mt-6 mb-4">
        Search Results for "{searchTerm}"
      </h2>
      <div className="flex flex-wrap gap-6">
        {results.length > 0 ? (
          results.map((song, i) => (
            <SongCard key={song.id || i} song={song} i={i} data={results} />
          ))
        ) : (
          <p className="text-white">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
