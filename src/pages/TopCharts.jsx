import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SongCard from '../components/SongCard';
import { Loader, Error } from '../components';

// 🔧 Функция нормализации под формат Jamendo
const normalizeJamendoTracks = (tracks) =>
  tracks.map((track) => ({
    id: track.id,
    title: track.name,
    preview: track.audio,
    artist: {
      id: track.artist_id,
      name: track.artist_name,
    },
    album: {
      title: track.album_name,
      cover_small: track.album_image,
      cover_medium: track.album_image,
    },
    image: track.album_image,
  }));

const TopCharts = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchTopCharts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jamendo/top-tracks');
        const normalized = normalizeJamendoTracks(response.data);
        setSongs(normalized);
      } catch (err) {
        console.error(err);
        setError('Cannot fetch charts from jamendo');
      } finally {
        setLoading(false);
      }
    };

    fetchTopCharts();
  }, []);

  if (loading) return <Loader title="Loading charts from Jamendo..." />;
  if (error) return <Error title={error} />;

  return (
    <div className="flex flex-col px-6 sm:px-12 py-10">
      <h2 className="text-3xl text-white font-bold mb-6">🔥 Top Charts (Jamendo)</h2>
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
