import NavBar from "../components/NavBar";
import ListeningTracker from "../components/ListeningTracker";
import { getUserBySession } from "@/auth/core/session";
import { UserContextProvider } from "@/lib/utils/contexts";
import UserInfo from "../components/UserInfo";


export const metadata = {
  title: "Push Play",
  description: "Application to help you generate mixtapes for your CDs and keep track of your music physical media collection.",
};

const navItems = [
  {name: "Dashboard"},
  {name: "My Collection"},
  {name: "My Wishlist"},
  {name: "Mixtape Maker"}
]

export default async function MainLayout({ children }) {

  const pathname = "";
  const noUserPath = ["/my-collection/add"]

  return (

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
        <UserContextProvider>
          <main className="mx-5 h-screen overflow-y-auto p-13">
            { !noUserPath.includes(pathname) ? <UserInfo /> : ""}
              {children}
          </main>
          </UserContextProvider>
      </div>

  );
}
