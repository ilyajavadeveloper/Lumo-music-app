import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

const PlayPause = ({ isPlaying, activeSong, song, handlePlay, handlePause }) => isPlaying && activeSong?.title === song.title ? (
    <BsFillPauseFill
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePause}
    />
  ) : (
    <BsFillPlayFill
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePlay}
    />
  );

export default PlayPause;
