import Home from "./pages/Home";
import DetailMovie from "./pages/DetailMovie";
import DetailTvSeries from "./pages/DetailTvSeries";
import Catalog from "./pages/Catalog";
import Header from "./components/Header/Header";
import Movie from "./pages/Movie";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="leading-normal min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoty/search/:keyword" element={<Catalog />} />
        <Route path="/movie/:id" element={<DetailMovie />} />
        <Route path="/tv/:id" element={<DetailTvSeries />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    </div>
  );
};

export default App;
