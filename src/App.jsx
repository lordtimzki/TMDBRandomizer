import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Button from "@mui/material/Button";
import Entry from "./components/Entry";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
function App() {
  const [apiData, setApiData] = useState(null);
  const [banList, setBanList] = useState([]);
  const [seenList, setSeenList] = useState([]);
  const callAPI = async (query) => {
    try {
      const withoutGenres = banList.map((genre) => genre.id).join(",");
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${ACCESS_KEY}&sort_by=popularity.desc&page=${
          Math.floor(Math.random() * 500) + 1
        }&without_genres=${withoutGenres}&include_adults=false`
      );
      const selectIndex = Math.floor(Math.random() * 20);
      const selection = await axios.get(
        `https://api.themoviedb.org/3/movie/${res.data.results[selectIndex].id}?api_key=${ACCESS_KEY}`
      );
      setApiData(selection.data);
      console.log(selection.data);
      if (!seenList.some((movie) => movie.id === selection.data.id)) {
        setSeenList((prevSeenList) => [...prevSeenList, selection.data]);
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const handleGenreClick = (genre) => {
    setBanList((prevBanList) => {
      if (!prevBanList.some((g) => g.id === genre.id)) {
        return [...prevBanList, genre];
      }
      return prevBanList.filter((g) => g.id !== genre.id);
    });
  };

  return (
    <>
      <div className="main">
        <h1>TMDB Randomizer</h1>
        <h3>Discover new movies!</h3>
        {apiData && (
          <Entry
            className="listing-container"
            data={apiData}
            onGenreClick={handleGenreClick}
          />
        )}
        <Button
          variant="contained"
          onClick={callAPI}
          sx={{ marginTop: "20px" }}
        >
          Randomize
        </Button>
      </div>
      <div className="seen">
        <h2>What have we seen so far?</h2>
        <ul>
          {seenList.map((movie, index) => (
            <div>
              {" "}
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
              />
              <li key={index}>{movie.title}</li>
            </div>
          ))}
        </ul>
      </div>
      <div className="ban">
        <h2>Ban List</h2>
        <ul>
          {" "}
          {banList.map((genre, index) => (
            <Button
              key={index}
              variant="outlined"
              sx={{ margin: "5px" }}
              onClick={() => handleGenreClick(genre)}
            >
              {genre.name}
            </Button>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
