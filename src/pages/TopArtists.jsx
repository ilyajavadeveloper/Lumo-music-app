import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArtistCard, Error, Loader } from '../components';

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jamendo/top-tracks');
        const topTracks = response.data || [];

        const uniqueArtistsMap = new Map();
        topTracks.forEach((track) => {
          if (!uniqueArtistsMap.has(track.artist_id)) {
            uniqueArtistsMap.set(track.artist_id, {
              id: track.artist_id,
              name: track.artist_name,
              image: track.album_image || '/default-artist.png', // ✅ fallback если вдруг пусто
            });
          }
        });

        setArtists(Array.from(uniqueArtistsMap.values()));
      } catch (err) {
        console.error('Error fetching top artists:', err);
        setError('Error fetching artists');
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, []);

  if (loading) return <Loader title="Loading artists..." />;
  if (error) return <Error title={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
