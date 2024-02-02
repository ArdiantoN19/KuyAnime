import { AnimeDataType } from "@/types/anime";
import { Play } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

const AnimeCard: FunctionComponent<AnimeDataType> = ({
  mal_id,
  title,
  images,
  score,
  season,
  year,
}) => {
  return (
    <Link href={`/anime/${mal_id}`} className="cursor-pointer">
      <div className="rounded overflow-hidden w-full h-[230px] md:h-[320px] bg-teal-200 relative group/card shadow hover:shadow-lg transition-all">
        <Image
          src={images.webp.large_image_url}
          alt={title}
          width={300}
          height={300}
          priority={true}
          className="w-full h-full group-hover/card:scale-105 duration-300 transition-all"
        />
        <div className="absolute transition-all top-0 left-0 z-1 bg-black/50 w-full h-full hidden place-items-center duration-300 group-hover/card:grid">
          <Play size={32} className="" color="white" />
        </div>
        <p className="absolute top-5 left-0 text-sm shadow z-1 bg-white p-2 rounded-r duration-300 transition-all">
          ⭐ {score || "N/A"}
        </p>
        <div className="absolute z-1 h-40 bottom-0 p-3 bg-gradient-to-t from-black w-full flex flex-col justify-end">
          <h5 className="font-bold text-base text-white truncate mb-2">
            {title}
          </h5>
          <div className="flex justify-between items-center">
            <small className="px-1 bg-teal-400 text-white rounded">
              {season || "N/A"}
            </small>
            <small className="text-white">{year || "N/A"}</small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
