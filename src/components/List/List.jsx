import React from "react";
import { results as popular_movies } from "../../../mocks/movies/popular_movies.json";
import ListItem from "./ListItem";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Col } from "antd";
export default function List({
  list_name,
  movies_list,
  onlyFav = false,
  type,
}) {
  return (
    <div className="List_main">
      <h2>{list_name}</h2>
      <div className="list_container">
        <TransitionGroup className={"list_container"}>
          {movies_list
            ?.filter((e) => e)
            .map((m, index) => (
              <CSSTransition
                key={m.id}
                timeout={400}
                classNames={{
                  enter: "horizontal-transition-enter",
                  enterActive: "horizontal-transition-enter-active",
                  exit: "horizontal-transition-exit",
                  exitActive: "horizontal-transition-exit-active",
                }}
              >
                <ListItem movie={m} key={index} onlyFav={onlyFav} type={type} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </div>
  );
}
