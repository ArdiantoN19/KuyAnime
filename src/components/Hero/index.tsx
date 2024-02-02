import { AnimeDataType } from "@/types/anime";
import { Calendar, Info, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

const Hero: FunctionComponent<AnimeDataType & { topNumber: number }> = ({
  topNumber,
  mal_id,
  title,
  score,
  season,
  year,
  trailer,
  synopsis,
}) => {
  return (
    <div className="w-full fade-in h-[26em] md:h-[29em] lg:h-[35em] bg-teal-500 rounded overflow-hidden shadow relative">
      <Image
        src={trailer.images.maximum_image_url}
        alt={title}
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black w-full h-[20em] md:h-[22em] p-3 md:p-5">
        <p className="text-lg md:text-xl text-teal-400 mb-5">
          #{topNumber} Anime of the Week
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-5 font-bold truncate">
          {title}
        </h2>
        <div className="flex gap-x-3 items-center mb-3">
          <div className="flex items-center text-sm text-white gap-x-1">
            <PlayCircle size={16} />
            Anime
          </div>
          <div className="flex items-center text-sm text-white gap-x-1">
            <Calendar size={16} />
            {year}
          </div>
          <div className="flex items-center px-1 rounded bg-white text-sm gap-x-1">
            ⭐ {score}
          </div>
          <div className="flex items-center px-1 rounded bg-teal-400 text-white text-sm gap-x-1">
            {season}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-justify line-clamp-4 text-white">{synopsis}</p>
        </div>
        <div className="w-36 flex">
          <Link
            href={`/anime/${mal_id}`}
            className="button mt-5 rounded-full flex items-center gap-x-1"
          >
            <Info size={24} />
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
