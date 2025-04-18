import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPause, FaPlay, FaStepBackward, FaStepForward, FaHeart, FaRegHeart, FaVolumeUp } from 'react-icons/fa';

import { playPause, nextSong, prevSong } from '/src/redux/features/playerSlice';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, currentSongs, currentIndex } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeSong]);

  const handlePlayPause = () => {
    dispatch(playPause(!isPlaying));
  };

  const handleNext = () => {
    dispatch(nextSong((currentIndex + 1) % currentSongs.length));
  };

  const handlePrev = () => {
    dispatch(prevSong((currentIndex - 1 + currentSongs.length) % currentSongs.length));
  };

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  if (!activeSong?.preview) return null;

  return (
    <div className="flex flex-col w-full px-4 py-2">
      <audio
        ref={audioRef}
        src={activeSong.preview}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        autoPlay
      />

      {/* Track Info */}
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <img
            src={activeSong.album?.cover_small || activeSong.album?.cover_medium}
            alt="cover"
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="text-sm font-semibold">{activeSong.title}</p>
            <p className="text-xs text-gray-400">{activeSong.artist?.name}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <FaStepBackward onClick={handlePrev} className="cursor-pointer hover:text-green-400" />
          {isPlaying ? (
            <FaPause onClick={handlePlayPause} className="cursor-pointer text-2xl" />
          ) : (
            <FaPlay onClick={handlePlayPause} className="cursor-pointer text-2xl" />
          )}
          <FaStepForward onClick={handleNext} className="cursor-pointer hover:text-green-400" />
        </div>

        {/* Like + Volume */}
        <div className="flex items-center gap-3">
          <button onClick={toggleLike}>
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-white" />}
          </button>
          <FaVolumeUp />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      {/* Progress bar */}
      <input
        type="range"
        value={progress}
        onChange={handleProgressChange}
        className="w-full mt-2 accent-green-500"
      />
    </div>
  );
};

export default MusicPlayer;
