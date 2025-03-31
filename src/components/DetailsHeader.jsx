const DetailsHeader = ({ image, title, subtitle }) => (
  <div className="flex items-center gap-6">
    <img
      src={image || 'https://via.placeholder.com/150?text=No+Image'}
      alt={title}
      className="w-28 h-28 rounded-lg shadow-lg object-cover"
    />
    <div>
      <h2 className="text-white text-3xl font-bold">{title}</h2>
      <p className="text-gray-300 mt-2">{subtitle}</p>
    </div>
  </div>
);

export default DetailsHeader;
