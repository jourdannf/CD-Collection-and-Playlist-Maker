import Image from "next/image";
import NavBar from "./components/NavBar";

const navItems = [
  {name: "Dashboard"},
  {name: "My Collection"},
  {name: "My Wishlist"},
  {name: "Playlist Maker"}
]

export default function Home() {
  return (
    <div className="grid grid-cols-[1fr_3.75fr]">
      <header className="border solid border-red-500 pl-8">
        <nav>
          <NavBar items={navItems} />
        </nav>
      </header>
      <main className="grid sm:grid-cols-12 sm:gap-5 mx-11 border solid border-purple-400">
          <h1>Text in main</h1>
      </main>
      
    </div>
  );
}
