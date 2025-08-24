import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./components/NavBar";
import ListeningTracker from "./components/ListeningTracker";
import "./globals.css";

export const metadata = {
  title: "Push Play",
  description: "Application to help you generate mixtapes for your CDs and keep track of your music physical media collection.",
};

const navItems = [
  {name: "Dashboard"},
  {name: "My Collection"},
  {name: "My Wishlist"},
  {name: "Playlist Maker"}
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">

      <div className="grid grid-cols-[auto_1fr] ">
        <header className="pl-8 w-[275px] bg-push-play-blue-900/18 pt-40 overflow-y-auto shadow-black/25 shadow-[1px_0px_24px] h-screen ">
          <div>
            <h4 className="text-push-play-blue-800 mb-11">Push Play</h4>
          </div>
          <nav className="mb-44">
            <NavBar items={navItems} />
          </nav>
          <ListeningTracker />
        </header>
        <main className="mx-5 h-screen overflow-y-auto">
            {children}
        </main>
        
      </div>
      </body>
    </html>
  );
}
