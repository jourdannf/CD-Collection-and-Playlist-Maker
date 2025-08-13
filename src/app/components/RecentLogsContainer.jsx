import MusicLog from "./MusicLog";

//Get Logs from db
//Use props to map info into Music Logs

export default async function RecentLogsContainer () {
    let logs = [];
    

    try {
        const opts = {
            method: "GET"
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/logs?sort=createdat&order=DESC&limit=3`, opts);
        logs = await response.json();
        
    }catch (e) {
        console.log(e);
        throw e;
    }

    return (
       <>
        {logs.map((logInfo) => {    
            return <MusicLog key={logInfo.log_id} logInfo={logInfo} imgHeight={118} imgWidth={118} type={"short"} className="mb-8" />
        })}
       </>
    )
}