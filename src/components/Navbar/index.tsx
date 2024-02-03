import Link from "next/link";
import { FunctionComponent } from "react";
import Search from "../Search";
import Auth from "./Auth";

const Navbar: FunctionComponent = () => {
  return (
    <header className="bg-teal-500 w-full py-3 sticky top-0 left-0 z-10 shadow">
      <nav className="container flex justify-between items-center md:flex-row flex-col gap-3 md:gap-0">
        <Link href={"/"} className="flex items-center gap-x-2">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-yellow-400">Kuy</span>Anime
          </h1>
        </Link>
        <Search />
        <Auth />
      </nav>
    </header>
  );
};

export default Navbar;
