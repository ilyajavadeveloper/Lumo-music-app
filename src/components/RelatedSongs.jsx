import React from 'react';
import SongCard from './SongCard';
import { useSelector } from 'react-redux';

const RelatedSongs = ({ songs }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (!Array.isArray(songs) || songs.length === 0) {
    return <p className="text-white text-lg">Нет связанных песен</p>;
  }

  return (
    <div className="flex flex-wrap gap-6">
      {songs.map((song, i) => (
        <SongCard
          key={song.id || `${song.title}-${i}`}
          song={song}
          i={i}
          data={songs}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      ))}
    </div>
  );
};

export default RelatedSongs;
