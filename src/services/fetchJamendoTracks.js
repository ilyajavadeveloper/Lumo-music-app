import axios from 'axios';

/**
 * Fetches tracks from Jamendo API via proxy
 */
export const fetchJamendoTracks = async (query = 'pop') => {
  if (!query || query.trim() === '') return [];

  try {
    const response = await axios.get('http://localhost:5000/jamendo/search', {
      params: { q: query }
    });

    const data = response.data;

    return data.map((track) => ({
      id: track.id,
      title: track.name,
      preview: track.audio,
      artist: {
        id: track.artist_id,
        name: track.artist_name,
        image: track.artist_image || track.album_image, // fallback
      },
      album: {
        title: track.album_name,
        cover_small: track.album_image,
        cover_medium: track.album_image,
      },
      image: track.album_image,
    }));
  } catch (err) {
    console.error('❌ Failed to fetch tracks from Jamendo:', err);
    return [];
  }
};
