import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Searchbar = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`/search/${term}`);
      setTerm('');
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="bg-white/10 text-white p-2 rounded-lg outline-none w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </form>

      {/* Theme toggle на краю */}
      <ThemeToggle />
    </div>
  );
};

export default Searchbar;
