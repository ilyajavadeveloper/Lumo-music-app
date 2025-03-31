import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Error, Loader, SongCard } from '../components';
import { useSelector } from 'react-redux';

const Discover = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/deezer/search?q=pop');
        setTracks(res.data || []);
      } catch (err) {
        setError('Не удалось загрузить треки');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) return <Loader title="Загрузка популярных треков..." />;
  if (error) return <Error title={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Popular Music</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks.map((song, i) => (
          <SongCard
            key={song.id || i}
            song={song}
            data={tracks}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
