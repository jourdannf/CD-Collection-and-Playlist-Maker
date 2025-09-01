const { createContext } = require("react");

export const DraggableTracklistContext = createContext(undefined);

export default function DraggableTracklistProvider({children, value}) {
    return <DraggableTracklistContext.Provider value={value}>{children}</DraggableTracklistContext.Provider>
}