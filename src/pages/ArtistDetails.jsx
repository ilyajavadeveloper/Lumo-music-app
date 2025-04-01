import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DetailsHeader from '../components/DetailsHeader';
import RelatedSongs from '../components/RelatedSongs';
import { fetchArtistDetails } from '../redux/features/dataSlice';
import { Loader, Error } from '../components';

const ArtistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artistDetails, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    if (!artistDetails[id]) {
      dispatch(fetchArtistDetails(id));
    }
  }, [id, dispatch, artistDetails]);

  const artist = artistDetails[id];

  if (loading) return <Loader title="Загрузка информации об артисте..." />;
  if (error) return <Error title="Не удалось загрузить данные об артисте" />;

  if (!artist) return null;

  return (
    <div className="p-6 text-white">
      <DetailsHeader
        image={artist.picture_big || 'https://via.placeholder.com/150'}
        title={artist.name}
        subtitle="Artist"
      />

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Top Songs</h3>
        <RelatedSongs songs={artist.topSongs || []} />
      </div>
    </div>
  );
};

export default ArtistDetails;
