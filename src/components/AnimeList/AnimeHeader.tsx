import Link from "next/link";
import { FunctionComponent } from "react";

interface AnimeHeaderProps {
  title: string;
  description?: string;
  keyword?: string;
  link?: string;
  linkTitle?: string;
}

const AnimeHeader: FunctionComponent<AnimeHeaderProps> = ({
  title,
  description,
  keyword = "Anime",
  link,
  linkTitle,
}) => {
  return (
    <div className="flex md:items-center items-start gap-y-2 md:gap-y-0 justify-between mt-10 flex-col md:flex-row">
      <div>
        <h1 className="text-xl md:text-2xl font-bold mb-2">
          <span className="text-teal-400 drop-shadow-sm">{title}</span>{" "}
          {keyword}
        </h1>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
      {link && linkTitle && (
        <Link className="button" href={link}>
          {linkTitle}
        </Link>
      )}
    </div>
  );
};

export default AnimeHeader;
