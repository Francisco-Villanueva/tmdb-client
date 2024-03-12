import React from "react";
import ReactPlayer from "react-player";

export default function Welcome() {
  return (
    <div className="welcome_main">
      <div>
        <h2>Welcome back sir</h2>
        <div className="loader"></div>
      </div>
      <div className="welcomeBack">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=LuuOpozKbvE`}
          playing={true}
        />
      </div>
    </div>
  );
}
