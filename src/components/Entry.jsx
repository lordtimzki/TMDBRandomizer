import React from "react";
import { Button } from "@mui/material";

const Entry = ({ data, onGenreClick, onCompanyClick }) => {
  const genres = data.genres;
  const companies = data.production_companies;
  const buttons = [];
  for (let i = 0; i < genres.length; i++) {
    buttons.push(
      <Button
        key={`genre-${genres[i].id}`}
        variant="outlined"
        style={{ marginBottom: "15px", marginRight: "10px" }}
        className="genre"
        onClick={() => onGenreClick(genres[i])}
      >
        {genres[i].name}
      </Button>
    );
  }

  for (let i = 0; i < companies.length; i++) {
    buttons.push(
      <Button
        key={`company-${companies[i].id}`}
        variant="outlined"
        style={{
          marginBottom: "15px",
          marginRight: "10px",
        }}
        onClick={() => onCompanyClick(companies[i])}
        color="error"
      >
        {companies[i].name}
      </Button>
    );
  }

  return (
    <div className="listing-container">
      <h2>{data.title}</h2>
      <div className="button-container">{buttons}</div>
      <img src={"https://image.tmdb.org/t/p/w185" + data.poster_path} />
    </div>
  );
};

export default Entry;
