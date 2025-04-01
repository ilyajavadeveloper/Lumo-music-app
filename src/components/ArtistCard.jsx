import { Link } from 'react-router-dom';

const ArtistCard = ({ artist }) => (
  <Link to={`/artists/${artist.id}`}>
    <div className="flex flex-col w-[200px] p-4 bg-white/5 dark:bg-white/10 rounded-lg cursor-pointer hover:scale-105 transition">
      <img
        src={artist.image || 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'}
        alt={artist.name}
        className="w-full h-48 rounded-lg object-cover"
      />
      <p className="mt-4 text-white dark:text-white text-lg text-center font-semibold truncate">
        {artist.name}
      </p>
    </div>
  </Link>
);

export default ArtistCard;
