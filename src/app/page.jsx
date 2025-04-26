import Image from "next/image";
import NavBar from "./components/NavBar";
import ListeningTracker from "./components/ListeningTracker";

const navItems = [
  {name: "Dashboard"},
  {name: "My Collection"},
  {name: "My Wishlist"},
  {name: "Playlist Maker"}
]

export default function Home() {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <header className="pl-8 w-[275px] h-screen bg-push-play-blue-900/18 pt-40 overflow-scroll shadow-black/25 shadow-[1px_0px_24px]">
        <div>
          <h4 className="text-push-play-blue-800 mb-11">Push Play</h4>
        </div>
        <nav className="mb-44">
          <NavBar items={navItems} />
        </nav>
        <ListeningTracker />
      </header>
      <main className="grid sm:grid-cols-12 sm:gap-5 mx-11 border solid border-purple-400 overflow-scroll">
          <h1>Text in main</h1>
      </main>
      
    </div>
  );
}
