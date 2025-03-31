import React from 'react';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const isActive = activeSong?.id === song.id;

  return (
    <div
      className={`flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer
      hover:scale-105 hover:shadow-lg transition-all duration-300 animate-slideup
      ${isActive ? 'bg-[#2a2a80]' : 'bg-opacity-20'} dark:bg-white/10`}
    >
      <img
        alt="cover"
        src={song.album?.cover_medium || song.album?.cover || 'https://via.placeholder.com/150'}
        className="w-full h-44 rounded-lg shadow-lg"
      />

      <div className="mt-4">
        <p className="text-md font-semibold truncate text-white dark:text-gray-100">{song.title}</p>
        <p className="text-sm text-gray-300 dark:text-gray-400 truncate">{song.artist?.name}</p>
      </div>

      <button
        onClick={isPlaying && isActive ? handlePauseClick : handlePlayClick}
        className="mt-4 px-4 py-1 bg-green-500 hover:bg-green-400 rounded text-sm text-white transition"
      >
        {isPlaying && isActive ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default SongCard;
