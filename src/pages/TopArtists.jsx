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
        const response = await axios.get('http://localhost:5000/deezer/top-artists');
        setArtists(response.data || []);
      } catch (err) {
        console.error('Error fetching top artists:', err);
        setError('Could not load top artists.');
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
