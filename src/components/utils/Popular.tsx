import AnimeHeader from "../AnimeList/AnimeHeader";
import AnimeList from "../AnimeList";
import { FunctionComponent } from "react";
import { getTopAnime } from "@/lib/api/services";
import { AnimeDatasType } from "@/types/anime";

const Popular: FunctionComponent = async () => {
  const topAnimes: AnimeDatasType = await getTopAnime({ limit: 10 });
  return (
    <section className="container">
      <AnimeHeader
        title="Top Popular"
        link="/popular"
        linkTitle="See More"
        description="Find the best new and continuing simulcasts here!"
      />
      <AnimeList datas={topAnimes.data} />
    </section>
  );
};

export default Popular;
