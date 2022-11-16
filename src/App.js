import "./App.css";
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Navigation from "./component/Navigation";
import ErrorInfo from './component/ErrorInfo';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetail />} />
        <Route path="*" element={<ErrorInfo />} />
      </Routes>
    </div>
  );
}

export default App;
