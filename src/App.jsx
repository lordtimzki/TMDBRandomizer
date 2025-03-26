import { useState } from "react";
import "./App.css";
import axios from "axios";
import Button from "@mui/material/Button";

const ACCESS_KEY = import.meta.env.ACCESS_KEY;
function App() {
  return (
    <>
      <div className="main">
        <h1>TMDB Randomizer</h1>
        <h3>Discover new shows or movies!</h3>
        <Button variant="contained">Randomize</Button>
      </div>
      <div className="seen">
        <h2>What have we seen so far?</h2>
      </div>
      <div className="ban">
        <h2>Ban List</h2>
      </div>
    </>
  );
}

export default App;
