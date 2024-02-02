import AnimeList from "@/components/AnimeList";
import AnimeHeader from "@/components/AnimeList/AnimeHeader";
import { getRecommendationAnime, randomAnime } from "@/lib/api/services";
import React from "react";

const Recommendation = async () => {
  let recommendationAnimes = await getRecommendationAnime();
  recommendationAnimes = randomAnime(recommendationAnimes, 10);

  return (
    <section className="container mb-14">
      <AnimeHeader
        title="Recommendation"
        description="Find recommendation anime here!"
      />
      <AnimeList datas={recommendationAnimes} />
    </section>
  );
};

export default Recommendation;
