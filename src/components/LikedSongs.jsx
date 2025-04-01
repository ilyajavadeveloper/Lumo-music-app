import React from 'react';
import { useSelector } from 'react-redux';
import { SongCard, Loader, Error } from '../components';

const LikedSongs = () => {
  const { likedSongs } = useSelector((state) => state.liked);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (!likedSongs) return <Loader title="Loading liked songs..." />;

  return (
    <div className="flex flex-col px-6 sm:px-12 py-10">
      <h2 className="text-3xl font-bold text-white dark:text-white mb-6">
        💖 Liked Songs
      </h2>

      {likedSongs.length === 0 ? (
        <p className="text-gray-300 dark:text-gray-400 text-lg">
          You haven't liked any songs yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {likedSongs.map((song, i) => (
            <SongCard
              key={song.id || `${song.title}-${i}`}
              song={song}
              i={i}
              data={likedSongs}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;
