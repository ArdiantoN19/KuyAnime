import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import { getTopAnime } from "@/lib/api/services";
import { AnimeDataType, AnimeDatasType } from "@/types/anime";
import Recommendation from "@/components/utils/Recommendation";
import Popular from "@/components/utils/Popular";

export default async function Home() {
  const topAnimes: AnimeDatasType = await getTopAnime({ limit: 10 });
  const HeroAnimes: AnimeDataType[] = topAnimes.data.slice(0, 3);
  return (
    <>
      <section className="container mt-8">
        <Carousel>
          {HeroAnimes.map((anime: AnimeDataType, index: number) => (
            <div key={index}>
              <Hero topNumber={index + 1} {...anime} />
            </div>
          ))}
        </Carousel>
      </section>
      <Popular />
      <Recommendation />
    </>
  );
}
