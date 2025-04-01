export const normalizeTrack = (raw) => {
  if (!raw) return null;

  return {
    id: raw.id || raw.key || '',
    title: raw.title || raw.name || 'Unknown Title',
    preview: raw.audio || '', // ✅ обязательно
    artist: {
      id: raw.artist_id || raw.artist?.id || '',
      name: raw.artist_name || raw.artist?.name || 'Unknown Artist',
    },
    album: {
      cover_small: raw.album_image || '',
      cover_medium: raw.album_image || '',
    },
    image: raw.album_image || '',
  };
};
