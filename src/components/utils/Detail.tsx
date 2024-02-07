import AddCollection from "@/components/Collection/AddCollection";
import { DetailAnimeType } from "@/types/anime";
import { formattedDate } from "@/utils";
import { HouseLine, Info } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

const DetailAnime: FunctionComponent<{
  detailAnime: DetailAnimeType;
}> = ({ detailAnime }) => {
  return (
    <section className="container mt-8 mb-10">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-y-5 md:gap-x-5">
        <div className="flex w-full lg:w-4/5 flex-col md:flex-row items-start gap-5">
          <div className="w-full md:w-1/3 lg:w-[calc(100%/4)] h-72 rounded overflow-hidden shadow">
            <Image
              src={detailAnime.images.webp.large_image_url}
              alt={detailAnime.title}
              width={300}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-4/5">
            <div className="flex items-center gap-x-1 mb-2 flex-wrap">
              <Link
                href={"/"}
                className="flex items-center text-sm gap-x-1 hover:text-teal-400"
              >
                <HouseLine size={16} /> Home
              </Link>
              <div className="flex items-center gap-x-1 text-sm">
                &raquo; Anime
              </div>
              <div className="flex items-center gap-x-1 text-sm">
                &raquo; {detailAnime.title}
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{detailAnime.title}</h1>
            <div className="flex items-center flex-wrap md:flex-nowrap gap-2 mb-3">
              <AddCollection
                mal_id={detailAnime.mal_id}
                anime_image={detailAnime.images.webp.large_image_url}
                anime_title={detailAnime.title}
              />
              <div className="border text-sm px-1.5 border-teal-400 rounded">
                {detailAnime.type}
              </div>
              <div className="border text-sm px-1.5 border-teal-400 rounded">
                Eps: {detailAnime.episodes || "N/A"}
              </div>
              <div className="border text-sm px-1.5 border-teal-400 rounded">
                {detailAnime.duration}
              </div>
              <div className="flex items-center px-1 rounded bg-white text-sm border gap-x-1">
                ⭐ {detailAnime.score || "N/A"}
              </div>
              <div className="flex items-center px-1 rounded bg-teal-400 text-white text-sm gap-x-1">
                {`${detailAnime.season || "N/A"} - ${
                  detailAnime.year || "N/A"
                }`}
              </div>
            </div>
            <div className="text-sm text-justify">{detailAnime.synopsis}</div>
          </div>
        </div>
        <div className="w-full lg:w-1/5 bg-slate-200/70  p-3 rounded shadow">
          <div className="flex items-center gap-x-1 mb-3">
            <Info size={24} />
            <h2 className="text-base font-bold">Information</h2>
          </div>
          <ul className="list-none flex flex-col gap-y-1">
            <li className="text-sm">
              <span className="font-semibold">Alternative title:</span>{" "}
              {detailAnime.title_synonyms || "-"}
            </li>
            <li className="text-sm">
              <span className="font-semibold">Mal Score:</span>{" "}
              {detailAnime.score} by {detailAnime.scored_by} votes
            </li>
            <li className="text-sm">
              <span className="font-semibold">Rating:</span>{" "}
              {detailAnime.rating}
            </li>
            <li className="text-sm">
              <span className="font-semibold">Aired:</span>{" "}
              {formattedDate(detailAnime.aired.from)}
            </li>
            <li className="text-sm">
              <span className="font-semibold">Type:</span> Anime
            </li>
            <li className="text-sm">
              <span className="font-semibold">Studio:</span>{" "}
              {detailAnime.studios.map(({ name }) => name).join(",")}
            </li>
            <hr className="border border-black/10 my-2" />
            <li className="text-sm flex items-center gap-1 flex-wrap">
              <span className="font-semibold">Genres:</span>
              {detailAnime.genres.map(({ mal_id, name }, index) => (
                <Link
                  key={index}
                  href={`/genres/${mal_id}`}
                  className="text-white bg-teal-400 rounded-full px-1.5"
                >
                  {name}
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DetailAnime;
