'use client'

import SpeechBubble from "./SpeechBubble"
import Album from "./Album";
import { useState, useEffect } from "react";
import { CloudFog } from "lucide-react";

export default function TopThreeContainer () {
    // const [selected, setSelected] = useState(2);
    const [logs, setLogs] = useState([]);
    const [zindexes, setZindexes] = useState({element1: "z-1", element2:  "z-3", element3:"z-2"})
    const [selected, setSelected] = useState(1);

    useEffect(() => {

        (async () => {
            try {
                const result = await fetch("http://localhost:3001/api/logs?sort=ratings&order=ASC&limit=3&");       
                setLogs(await result.json());
                
            }catch (e) {
                throw e;
            }
        })();

    },[])

    function handleClick (e) {
        const parentDiv = e.currentTarget;
        const albumClicked = e.target;

        const albums = parentDiv.querySelectorAll("img")

        if (albumClicked === albums[0]) {
            setZindexes({element1: "z-3", element2:  "z-2", element3:"z-1"});
            setSelected(0);
        }else if (albumClicked === albums[1]) {
            setZindexes({element1: "z-1", element2:  "z-3", element3:"z-2"});
            setSelected(1);
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
            <div className="flex *:hover:z-4 *:hover:cursor-pointer" onClick={handleClick}>
                {/*logs.map((e,i) => {
                    return <Album key={`${e}_${i}`} 
                                albumInfo={e} 
                                width="100" 
                                height="100"
                                className="absolute"
                            />
                })*/}

                
                { logs.length == 3 &&
                <> 
                <Album 
                    key={`${logs[0].log_id}`} 
                    albumInfo={logs[0]} 
                    width="100" 
                    height="100"
                    className={`${zindexes.element1} -rotate-20 z-2 translate-y-4 translate-x-6`}
                />

                <Album 
                    key={`${logs[1].log_id}`} 
                    albumInfo={logs[0]} 
                    width="100" 
                    height="100"
                    className={`${zindexes.element2} drop-shadow-lg`}
                />

                <Album 
                    key={`${logs[2].log_id}`} 
                    albumInfo={logs[0]} 
                    width="100" 
                    height="100"
                    className={`${zindexes.element3} rotate-20 z-1 translate-y-4 -translate-x-6`}
                    
                />
                </>
                
                }
            </div>
            <SpeechBubble />
        </>
    )
}