import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SongCard from '../components/SongCard';
import { Loader, Error } from '../components';

const TopCharts = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchTopCharts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/deezer/top-charts');
        setSongs(response.data);
      } catch (err) {
        setError('Не удалось загрузить чарты');
      } finally {
        setLoading(false);
      }
    };

    fetchTopCharts();
  }, []);

  if (loading) return <Loader title="Загружаем чарты..." />;
  if (error) return <Error title={error} />;

  return (
    <div className="flex flex-col px-6 sm:px-12 py-10">
      <h2 className="text-3xl text-white font-bold mb-6">🔥 Top Charts</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.id || i}
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

export default TopCharts;
