import Album from "./components/Album";
import MusicLogInput from "./components/MusicLogInput";
import TopThreeContainer from "./components/TopThreeContainer";
import RecentLogsContainer from "./components/RecentLogsContainer";

let recentPlays = [];
let options = [];
let testItems = [
  {
    id: 2,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  }, 
  {
    id: 3,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
  {
    id: 20,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
  {
    id: 34,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
  {
    id: 7,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
  {
    id: 16,
    title: "Time Machine",
    album_art: "/sole_time_machine.jpeg",
    artist_name: "SOLE",
    medium: "vinyl"
  },
 
];

export default async function Home() {
  
    const opts = {
      method: "GET"
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/history`, opts);
      const resArray = await res.json();

      recentPlays = resArray;

      const albumsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums`, opts);
      options = await albumsRes.json();

    }catch (e) {
      console.log(e);
      throw e;
    }
    
  

  options = options.map((album, i) => {
    return {
      id: album.album_id,
      value: `${album.title} - Artist Name`
    }
  });
  
  return (
    <>
    <div className="grid sm:grid-cols-[0.41fr_0.59fr] auto-rows-auto mx-11 h-screen overflow-y-scroll pb-28">
      <div className="col-start-1 col-end-3 h-auto mb-24">
        <h4 className="mb-7 pt-7">Recently Played</h4>
        <div className="grid grid-flow-col auto-cols-[19%] overflow-x-scroll">
          {
            testItems?.map((e) => {
              return <Album key={e.id} variant="showCaption" albumInfo={e} width="150" height="150" className="row-span-1" />
            })
          }
        </div>
      </div>

      <MusicLogInput className="col-start-1 col-end-3 mb-24" />
      
      <div className="col-start-1 col-end-2">
          <h4 className="mb-6">My Top Three Picks</h4>
          <TopThreeContainer />
      </div>
      <div className="col-start-2 col-end-3">
          <h4 className="mb-6">Recent Logs</h4>
          <RecentLogsContainer />
      </div>
      
    </div>
    </>
  );
}
