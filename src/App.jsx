import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import SearchResults from './components/SearchResult' ;


import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts
} from './pages';

const App = () => {
  // Получаем активную песню из глобального состояния Redux
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      {/* Боковое меню (навигация слева) */}
      <Sidebar />

      {/* Основная часть экрана */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        {/* Поисковая строка вверху */}
        <Searchbar />

        {/* Контентная часть с прокруткой и TopPlay блоком */}
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          {/* Основной блок страниц */}
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<SearchResults />} /> {/* ✅ */}
            </Routes>
          </div>

          {/* Блок TopPlay закреплён справа на больших экранах */}
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {/* Аудиоплеер отображается, если есть активная песня */}
      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
