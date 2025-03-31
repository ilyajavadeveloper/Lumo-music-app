export const normalizeTrack = (raw) => {
  if (!raw) return null;

  return {
    id: raw.id || raw.key || '',
    title: raw.title || raw.name || 'Unknown Title',
    artistName: raw.artist?.name || raw.artistName || raw.subtitle || 'Unknown Artist',
    artistId: raw.artist?.id || raw.artistId || raw.artists?.[0]?.adamid || '',
    cover: raw.album?.cover_medium || raw.images?.coverart || raw.cover || 'https://via.placeholder.com/250x250',
    raw, // сохраняем оригинал для будущего, если понадобится
  };
};
