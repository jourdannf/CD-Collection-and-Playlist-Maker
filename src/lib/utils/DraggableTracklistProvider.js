//Provides context for track that needs to be cloned

import { createContext } from "react";

export const DraggableTracklistContext = createContext(undefined);

export default function DraggableTracklistProvider({children, value}) {
    return <DraggableTracklistContext.Provider value={value}>{children}</DraggableTracklistContext.Provider>
}