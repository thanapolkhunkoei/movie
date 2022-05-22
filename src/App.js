import axios from "axios";
import { useEffect, useState } from "react";
import Main from "./Pages/Main";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [movies, setMovies] = useState([]);
  // let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=a`;

  const url = process.env.REACT_APP_API_URL;

  const getMovie = async () => {
    let result = await axios.get(url).then((res) => {
      // console.log(res.data.results);
      setMovies(res.data.results);
    });
  };

  useEffect(() => {
    getMovie();
  }, []);

  // console.log(movies);

  return (
    <>
      <Main movies={movies} setMovies={setMovies} />
    </>
  );
}

export default App;
