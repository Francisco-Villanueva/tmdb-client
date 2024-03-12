import React, { useEffect, useState } from "react";

export default function useRandom(length, time) {
  const [randomIndex, setRandomIndex] = useState(
    Math.trunc(Math.random() * length)
  );

  const [pause, setPause] = useState(true);
  useEffect(() => {
    if (pause) {
      const interval = setInterval(() => {
        setRandomIndex(Math.trunc(Math.random() * length));
      }, time * 1000 || 10000);

      return () => clearInterval(interval);
    }
  }, [pause]); // El segundo argumento (array vacío) asegura que se ejecute solo una vez al montar el componente

  const handlePause = () => {
    console.log("entro al HANDLE PAUSE, nuevo valor: ", !pause);
    setPause(!pause);
  };
  return { randomIndex, handlePause };
}
