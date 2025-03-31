import { useRef, useEffect } from 'react';

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (ref.current && seekTime !== null) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      ref={ref}
      src={activeSong?.hub?.actions?.[1]?.uri}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
