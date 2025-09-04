//Provides context for tracks that are inside the boombox that needs to be cloned

import { createContext } from "react";
import { fetchBoomboxTracks } from "./fetchTracks";

export const InsideBoomboxContext = createContext(null);

export default function DraggableTracklistProvider({children, value}) {
    return <InsideBoomboxContext.Provider value={value}>{children}</InsideBoomboxContext.Provider>
}