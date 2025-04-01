import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader, Error, SongCard } from '../components';
import { fetchJamendoTracks } from '../services/fetchJamendoTracks';

const AroundYou = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const genre = 'electronic'; // или другой жанр: 'rock', 'pop', 'jazz'...

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetchJamendoTracks(genre);
        setTracks(res);
      } catch (err) {
        console.error('Error fetching genre-based tracks:', err);
        setError('Error fetching music by genre...');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [genre]);

  if (loading) return <Loader title="Loading music by genre..." />;
  if (error) return <Error title={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Музыка по жанру — <span className="font-black">{genre}</span>
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
