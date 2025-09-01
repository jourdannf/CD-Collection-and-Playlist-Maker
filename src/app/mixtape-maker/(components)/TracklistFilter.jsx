
import DraggableTracklist from "./DraggableTracklist";
import { fetchTracksFilter } from "@/lib/utils/fetchTracks";

//Will change into a server component so that I can call a function to fetch albums here

export default async function TracklistFilter() {
    // const [search, setSearch] = useState('');
    // const [inputVal] = useDebounce(search, 200);
    // const [tracks, setTracks] = useState([]);
    // const [initialResult, setInitialResult] = useState([]);
    // const [draggedTrack, setDraggedTrack] = useState(
    //     {
    //         track: {},
    //         trackNum: 1,
    //         offset: 0,
    //         event: {}
    //     }
    // );
    // const [databaseEmpty, setDatabseEmpty] = useState({valid: false, message: ""});

    // const [trackRef, inView, entry] = useInView({threshold: 0.1});
    // const containerRef = useRef(null);
    // const offset = useRef(1);
    // const numberOfItems = 10;

    // gsap.registerPlugin(useGSAP);

    // useEffect(() => { // deal w search inputs
    //     let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=${numberOfItems}&search=${inputVal}`;

    //     if (databaseEmpty.valid) {
    //         setDatabseEmpty({valid: false, message: ""});
    //     }
    //     if (initialResult.length != 0 && inputVal === '') {
    //         setTracks(initialResult);
    //         return;
    //     }
        
    //     (async () => {
    //         const result = await fetch(fetchString);
    //         let tracksResult = await result.json();

    //         if (inputVal !== "") { // Removes what's inside the boombox from the serach filter
    //             tracksResult = tracksResult.filter(track => {                
    //                 return insideBoombox.some(boomboxSong => {
    //                     return boomboxSong.track_id !== track.track_id
    //                 });
    //             });
    //         }
            
    //         if (initialResult.length === 0 && inputVal === '') { // no intial result and no input value initializies initial result
    //             setInitialResult(tracksResult);
    //         }
    //         setTracks(tracksResult);
    //     })();

    // }, [inputVal]);

    // useEffect(() => { // load more on scroll
    //     let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=${numberOfItems}&search=${inputVal}&offset=${offset.current}`

    //     if (inView && !databaseEmpty.valid) {// if you're at the last track in the list and there are more songs to load
    //         (async () => {
    //             try {
    //                 const result = await fetch(fetchString);
    //                 const additionalTracks = await result.json();

    //                 if (additionalTracks.length !== 0) {
    //                     setTracks([...tracks, ...additionalTracks]);
    //                     offset.current += 1;

    //                     if (inputVal === '') { // no input value adds on to the intial result that should be reverted to if search is empty
    //                         setInitialResult([...tracks, ...additionalTracks]);
    //                     }
    //                 }else {
    //                     setDatabseEmpty({valid: true, message: "There are no more songs in your collection"})
    //                 }

    //             }catch (e) {
    //                 throw e;
    //             }
    //         })();
    //     }
        
    // },[inView])

    
    // function handleChange(e) {
    //     setSearch(e.target.value);
    // }
    
    //How To Execute Drag and Drop Outside of Scroll Div
    //Create a use state variable that contains infomration about the element being dragged along with it's coordinates
    //Pass this state variable to every track. If the track is being dragged, then the state variable will update upon press
    //When a track is pressed, it will be invisible and the same element will be placed in the outer div that's not hidden using the state variable
    //When the drag is over, the element will ease back into it's intial place, the state variable will be updated to null, and then the former element display will be set to hidden
    let tracks = [];
    const query = "";
    const limit = 35;
    const offset = tracks.length/limit;
    
    tracks = await fetchTracksFilter(query, limit, offset);
    
    return(
        
        <div className="relative mx-8">
            {/* <div className="absolute right-0">
                <InputText 
                    className={`w-96 h-8`} 
                    placeholder="What song did you want to add?"
                    icon={<Search  size={17} strokeWidth={2.5} />}
                    variant="startIcon"
                    handleChange={handleChange}
                    inputVal={search}
                />
            </div> */}
            
            {/* <div className="relative top-11" >
                {draggedTrack && <Track className="clone absolute" track={draggedTrack.track} trackNum={draggedTrack.trackNum} clone={draggedTrack} handleDrag={handleDrag} handleDragEnd={handleDragEnd} draggedTrack={draggedTrack} />}
                <TrackList ref={trackRef} tracks={tracks} handleDragEnd={handleDragEnd} handleDrag={handleDrag} setDraggedTrack={setDraggedTrack} containerRef={containerRef} cropped databaseEmpty={databaseEmpty} />
                
            </div> */}

            <DraggableTracklist tracks={tracks} />

            
        </div>
    )
}