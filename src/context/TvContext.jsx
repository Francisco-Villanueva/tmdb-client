import axios from "axios";
import { createContext, useState } from "react";
const initialState = {
  tv: {},
};

export const TvContext = createContext(initialState);

export function TvProvider({ children }) {
  const [state, setState] = useState({
    tv: {},
    topRated: [],
    airingToday: [],
    onTheAir: [],
    popular: [],
  });

  const setTvData = async () => {
    try {
      const tvs = await axios.get(`http://localhost:4000/tv`);
      // console.log({ tvs: tvs.data });
      setState((state) => ({
        ...state,
        tv: tvs.data,
        popular: tvs.data.popular,
        topRated: tvs.data.topRated,
        onTheAir: tvs.data.onTheAir,
        airingToday: tvs.data.airingToday,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TvContext.Provider
      value={{
        ...state,
        setTvData,
      }}
    >
      {children}
    </TvContext.Provider>
  );
}
