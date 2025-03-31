import { loader } from '../assets';

const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col mt-20">
    <img
      src={loader}
      alt="loader"
      className="w-24 h-24 object-contain animate-spin"
    />
    <h1 className="font-bold text-2xl text-white mt-6 animate-pulse">
      {title || 'Loading...'}
    </h1>
  </div>
);

export default Loader;
