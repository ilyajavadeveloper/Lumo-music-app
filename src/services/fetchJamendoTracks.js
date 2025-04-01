import axios from 'axios';

const JAMENDO_CLIENT_ID = 'fc610b1f';
const BASE_URL = 'https://api.jamendo.com/v3.0';

export const fetchJamendoTracks = async (query = 'pop') => {
  if (!query.trim()) return [];

  const params = {
    client_id: JAMENDO_CLIENT_ID,
    format: 'json',
    limit: 30,
    namesearch: query,
    include: 'musicinfo+stats',
    order: 'popularity_total',
  };

  try {
    const response = await axios.get(`${BASE_URL}/tracks/`, { params });
    const data = response.data?.results || [];

    // ✅ Только треки с рабочим аудио
    return data
      .filter((track) => !!track.audio)
      .map((track) => ({
        id: track.id,
        title: track.name || 'Untitled',
        preview: track.audio,
        artist: {
          id: track.artist_id,
          name: track.artist_name || 'Unknown Artist',
        },
        album: {
          title: track.album_name || 'Unknown Album',
          cover_small: track.album_image || 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
          cover_medium: track.album_image || 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
        },
        image: track.album_image || 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
      }));
  } catch (err) {
    console.error('❌ Failed to fetch Jamendo tracks:', err);
    return [];
  }
};
