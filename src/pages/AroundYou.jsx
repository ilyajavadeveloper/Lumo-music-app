import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Loader, Error, SongCard } from '../components';

const AroundYou = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // ❗ Жестко заданная страна (или жанр)
  const country = 'FR'; // можно 'KZ', 'US', 'UK' и т.п.

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/deezer/search?q=${country}`);
        setTracks(res.data);
      } catch (err) {
        console.error('Error fetching tracks:', err);
        setError('Не удалось загрузить треки по региону');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [country]);

  if (loading) return <Loader title="Loading music around you." />;
  if (error) return <Error title={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Музыка рядом с вами — <span className="font-black">{country}</span>
      </h2>

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

export default AroundYou;
