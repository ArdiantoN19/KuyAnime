import Link from "next/link";
import { FunctionComponent } from "react";
import Search from "../Search";
import ProfileMenu from "./ProfileMenu";

const Navbar: FunctionComponent = () => {
  return (
    <header className="bg-teal-500 w-full py-3 sticky top-0 left-0 z-10 shadow">
      <nav className="container flex justify-between items-center gap-x-3 md:gap-0">
        <Link href={"/"} className="flex items-center gap-x-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-yellow-400">Kuy</span>Anime
          </h1>
        </Link>

        <div className="flex items-center gap-x-2 md:gap-x-4">
          <Search />
          <ProfileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
