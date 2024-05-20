import { createContext, useRef } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

   
    const contextValue = {
   
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.childern}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;