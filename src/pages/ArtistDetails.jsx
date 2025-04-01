import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, Error, SongCard } from '../components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ArtistDetails = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jamendo/artist/${id}`);
        setArtist(response.data.artist);
        setTracks(response.data.tracks);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить информацию об артисте');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [id]);

  if (loading) return <Loader title="Загружаем артиста..." />;
  if (error) return <Error title={error} />;

  return (
    <div className="flex flex-col px-6 sm:px-12 py-10">
      <div className="flex items-center gap-4 mb-10">
        <img
          src={artist.image || 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'}
          alt={artist.name}
          className="w-28 h-28 object-cover rounded-full shadow-lg"
        />
        <h2 className="text-3xl font-bold text-white">{artist.name}</h2>
      </div>

      <h3 className="text-white text-xl font-semibold mb-4">Top Tracks</h3>
      <div className="flex flex-wrap gap-6">
        {tracks.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            i={i}
            data={tracks}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistDetails;
