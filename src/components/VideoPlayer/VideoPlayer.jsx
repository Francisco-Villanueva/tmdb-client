import React from "react";
import ReactPlayer from "react-player";
import Loading from "../../commons/Loading";
export default function VideoPlayer({ videoId }) {
  return (
    <div
      className="videoPlayer_container"
      style={{ width: "100%", background: "#000", height: "100%" }}
    >
      {videoId ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          playing={true}
          // controls={true}
          config={{
            youtube: {
              playerVars: {
                showinfo: 1,
              },
            },
          }}
          width={"100%"}
          height={"50vh"}
        />
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
}
