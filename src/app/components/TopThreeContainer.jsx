'use client';

import SpeechBubble from "./SpeechBubble"
import Album from "./Album";
import { useState, useEffect } from "react";

export default function TopThreeContainer () {
    // const [selected, setSelected] = useState(2);
    const [logs, setLogs] = useState([]);
    const [zindexes, setZindexes] = useState({element1: "z-1", element2:  "z-3", element3:"z-2"})
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/logs?sort=ratings&order=DESC&limit=3`);
                setLogs(await result.json());
                
            }catch (e) {
                throw e;
            }
        })();

    },[])

    function handleClick (e) {
        const parentDiv = e.currentTarget;
        const albumClicked = e.target;

        const albums = parentDiv.querySelectorAll("img");

        if (albumClicked === albums[0]) {
            setZindexes({element1: "z-3", element2:  "z-2", element3:"z-1"});
            setSelected(1);
        }else if (albumClicked === albums[1]) {
            setZindexes({element1: "z-1", element2:  "z-3", element3:"z-2"});
            setSelected(0);
        }else if (albumClicked === albums[2]) {
            setZindexes({element1: "z-1", element2:  "z-2", element3:"z-3"});
            setSelected(2);
        }
    }


    return (
        <>
            {/*  Each log will have to keep track of if it's currently being clicked on and text for speech bubble 
             If album is clicked on the speech bubble is filled with related text
             If album is clicked on the z index comes up to the forefront */
             }
            <div className="flex *:hover:z-4 *:hover:cursor-pointer mb-16 *:hover:drop-shadow-sm *:hover:drop-shadow-push-play-charcoal-700" onClick={handleClick}>
                
                {logs.length == 3 &&
                <> 
                <Album 
                    albumInfo={logs[1]} 
                    width="100" 
                    height="100"
                    className={`${zindexes.element1} -rotate-20 z-2 translate-y-3 translate-x-9.5 ${selected === 1 ? "drop-shadow-sm drop-shadow-push-play-charcoal-700": ""}`}
                />

                <Album 
                    albumInfo={logs[0]} 
                    width="100" 
                    height="100"
                    className={`${zindexes.element2} ${selected === 0 ? "drop-shadow-sm drop-shadow-push-play-charcoal-700": ""}`}
                />

                <Album  
                    albumInfo={logs[2]} 
                    width="100" 
                    height="100"
                    className={`${zindexes.element3} rotate-20 z-1 translate-y-3 -translate-x-9.5 ${selected === 2 ? "drop-shadow-sm drop-shadow-push-play-charcoal-700": ""}`}
                    
                />
                </>
                
                }
            </div>
            <SpeechBubble albumInfo={logs[selected]} />
        </>
    )
}