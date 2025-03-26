import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Button from "@mui/material/Button";
import Entry from "./components/Entry";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
function App() {
  const [apiData, setApiData] = useState(null);
  const [banList, setBanList] = useState([]);
  const callAPI = async (query) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${ACCESS_KEY}&sort_by=popularity.desc&page=${
          Math.floor(Math.random() * 500) + 1
        }`
      );
      const selectIndex = Math.floor(Math.random() * 20);
      const selection = await axios.get(
        `https://api.themoviedb.org/3/movie/${res.data.results[selectIndex].id}?api_key=${ACCESS_KEY}`
      );
      setApiData(selection.data);
      console.log(selection.data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };
  const handleGenreClick = (genre) => {
    setBanList((prevBanList) => {
      if (!prevBanList.some((g) => g.id === genre.id)) {
        return [...prevBanList, genre];
      }
      return prevBanList;
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
      </div>
      <div className="ban">
        <h2>Ban List</h2>
        <ul>
          {" "}
          {banList.map((genre, index) => (
            <li key={index}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
