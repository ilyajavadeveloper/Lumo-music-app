import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { normalizeTrack } from '../utils/normalizeTrack';
import PlayPause from './PlayPause';

const TopPlay = ({ songs }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: songs, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="p-4 bg-white/5 rounded-lg">

      <div className="flex flex-col gap-4">
        {songs?.map((song, i) => {
          const normalized = normalizeTrack(song);

          return (
            <div
              key={normalized.id || `${normalized.title}-${i}`}
              className="flex items-center justify-between bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={normalized.cover}
                  alt={normalized.title}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <Link to={`/songs/${normalized.id}`} className="text-white font-semibold text-sm truncate">
                    {normalized.title}
                  </Link>
                  <Link to={`/artists/${normalized.artistId}`} className="text-gray-300 text-xs hover:text-green-400">
                    {normalized.artistName}
                  </Link>
                </div>
              </div>

              <PlayPause
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(song, i)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopPlay;
