import React from "react";
import MoreInfo from "../MoreInfo";
import { Box, Chip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCalendar } from "@fortawesome/free-solid-svg-icons";
export default function Details({
  original_title: title,
  original_name: name,
  overview,
  genres,
  production_companies: companies,
  release_date: date,
  first_air_date: date2,
  vote_average,
  id,
  type,
}) {
  // const{}=props
  return (
    <div className="details_container">
      <div className="details_top">
        <h1>{title || name}</h1>
        <MoreInfo size={30} onlyFav={true} id={id} title={title} type={type} />
      </div>

      <Box sx={{ display: "flex", gap: "1em" }}>
        <Chip
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
          }}
          icon={<FontAwesomeIcon icon={faCalendar} />}
          label={date || date2}
          color={"info"}
        />
        <Chip
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
          }}
          icon={<FontAwesomeIcon icon={faStar} />}
          label={vote_average}
          color={vote_average >= 7 ? "success" : "warning"}
        />
      </Box>

      <hr style={{ width: "50%" }} />

      <span>{overview}</span>

      <div>
        <div className="genres_container">
          <h2>Genres</h2>

          {genres.map((genre) => (
            <>
              - <> {genre.name} </>
            </>
          ))}
        </div>
        <div className="genres_container">
          <h2>Companies</h2>

          {companies.map((companie) => (
            <>
              - <> {companie.name} </>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
