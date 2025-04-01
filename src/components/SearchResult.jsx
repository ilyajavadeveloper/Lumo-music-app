import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchJamendoTracks } from '../services/fetchJamendoTracks'; // ✅ убедись, что файл экспортирует правильно
import { Loader, Error, SongCard } from '../components';

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const results = await fetchJamendoTracks(searchTerm);
        setSongs(results);
      } catch (err) {
        console.error('Search fetch error:', err);
        setError('Не удалось загрузить результаты поиска');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [searchTerm]);

  if (loading) return <Loader title={`Loading "${searchTerm}"...`} />;
  if (error) return <Error title={error} />;
  if (!songs.length) return <Error title={`Cannot find nothing on your request "${searchTerm}".`} />;

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="font-bold text-3xl text-white text-center mb-6">
        Результаты поиска: <span className="text-green-400">"{searchTerm}"</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.id || `${song.title}-${i}`}
            song={song}
            i={i}
            data={songs}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
