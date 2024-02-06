import { ResponseCollectionType } from "@/types/collection";
import { Play } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React, { FunctionComponent } from "react";

const CollectionCard: FunctionComponent<ResponseCollectionType> = ({
  id,
  anime_mal_id,
  owner_id,
  anime_image,
  anime_title,
  ...props
}) => {
  return (
    <Link href={`/anime/${anime_mal_id}`} className="cursor-pointer">
      <div className="rounded overflow-hidden w-full h-[230px] md:h-[320px] bg-teal-200 relative group/card shadow hover:shadow-lg transition-all">
        <Image
          src={anime_image}
          alt={anime_title}
          width={300}
          height={300}
          priority={true}
          className="w-full h-full group-hover/card:scale-105 duration-300 transition-all"
        />
        <div className="absolute transition-all top-0 left-0 z-1 bg-black/50 w-full h-full hidden place-items-center duration-300 group-hover/card:grid">
          <Play size={32} color="white" />
        </div>
        <p className="absolute top-5 left-0 text-sm shadow z-1 bg-white p-2 rounded-r duration-300 transition-all">
          ⭐ N/A
        </p>
        <div className="absolute z-1 h-40 bottom-0 p-3 bg-gradient-to-t from-black w-full flex flex-col justify-end">
          <h5 className="font-bold text-base text-white truncate mb-2">
            {anime_title}
          </h5>
          <div>
            <small className="px-1 bg-teal-400 text-white rounded">Anime</small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
