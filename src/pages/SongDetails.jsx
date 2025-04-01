import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DetailsHeader from '../components/DetailsHeader';
import RelatedSongs from '../components/RelatedSongs';
// Suppose you have a thunk to fetch song details



const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();

  // Retrieve song details and related songs from Redux state (adjust according to your store structure)
  const songDetails = useSelector((state) => state.data.songDetails[songid]);
  const relatedSongs = useSelector((state) => state.data.relatedSongs[songid]) || [];

  useEffect(() => {
    if (!songDetails) {
      dispatch(fetchSongDetails(songid));
    }
  }, [songid, songDetails, dispatch]);

  if (!songDetails) {
    return <div className="p-6 text-white">Loading song details...</div>;
  }

  return (
    <div className="p-6 text-white">
      <DetailsHeader
        image={songDetails.album?.cover_medium || 'https://via.placeholder.com/150'}
        title={songDetails.title}
        subtitle={songDetails.artist?.name}
      />

      <div className="mt-8">
        <RelatedSongs songs={relatedSongs} />
      </div>
    </div>
  );
};

export default SongDetails;
