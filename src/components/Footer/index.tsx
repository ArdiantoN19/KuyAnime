import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

type SocialType = {
  id: number;
  link: string;
  icon: ReactNode;
  title: string;
};

const mySocials: SocialType[] = [
  {
    id: 1,
    link: "https://github.com/ArdiantoN19",
    icon: <GithubLogo size={16} />,
    title: "github",
  },
  {
    id: 2,
    link: "https://www.instagram.com/ardi_19n/",
    icon: <InstagramLogo size={16} />,
    title: "instagram",
  },
  {
    id: 3,
    link: "https://www.linkedin.com/in/ardianto-nugroho-004043244/",
    icon: <LinkedinLogo size={16} />,
    title: "linkedin",
  },
];

const alphabets: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Footer: FunctionComponent = () => {
  return (
    <footer className=" bg-teal-400 py-10 mt-28">
      <div className="container">
        <div className="flex gap-x-7 md:gap-x-10 md:w-1/2 lg:w-1/3 pb-5 border-b mb-5">
          <Link
            href={"/"}
            className="flex items-center gap-x-2 pr-5 md:pr-7 border-r"
          >
            <h1 className="text-3xl font-bold text-white">
              <span className="text-yellow-400">Kuy</span>Anime
            </h1>
          </Link>
          <div>
            <small className="text-white block mb-2">Let Find My Socials</small>
            <div className="flex gap-x-2">
              {mySocials.map((social) => (
                <Link
                  key={social.id}
                  href={social.link}
                  className="bg-white text-teal-400 p-2 rounded shadow-sm"
                  title={social.title}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <h2 className="text-white text-xl font-bold leading-none">
            A-Z LIST
          </h2>
          <small className="text-white">Search anime with letter A to Z</small>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {alphabets.map((alphabet, index) => (
            <Link
              key={index}
              href={`/search/${alphabet}?page=1`}
              className="bg-white text-teal-400 h-9 flex items-center justify-center w-10 text-lg rounded shadow-sm"
              title={`search anime with letter ${alphabet}`}
            >
              {alphabet}
            </Link>
          ))}
        </div>
        <hr />
        <div className="text-center mt-5">
          <p className="text-sm text-white block mb-2">
            &copy; {new Date().getFullYear()} KuyAnime. All rights reserved.
          </p>
          <p className="text-white text-sm">Made with ❤️ by Ardianto</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
