import { AnimeDataType, RecommendationAnimeType } from "@/types/anime";
import { FunctionComponent } from "react";
import AnimeCard from "@/components/AnimeCard";
import DataNotFound from "../DataNotFound";

interface AnimeListProps {
  datas: AnimeDataType[] | RecommendationAnimeType[];
}

const AnimeList: FunctionComponent<AnimeListProps> = ({ datas }) => {
  if (!datas.length) {
    return <DataNotFound />;
  }
  return (
    <div className="mt-5 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-5">
        {datas.map((anime: any, index) => (
          <div key={index}>
            <AnimeCard {...anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
