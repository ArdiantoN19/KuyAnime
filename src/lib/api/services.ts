import {
  AnimeDataType,
  AnimeDatasType,
  DetailAnimeType,
  RecommendationAnimeType,
} from "@/types/anime";

const convertDataAnime = (datas: AnimeDataType[]) => {
  return datas.map(
    ({
      mal_id,
      images,
      title,
      score,
      season,
      year,
      trailer,
      synopsis,
    }: AnimeDataType) => ({
      mal_id,
      images,
      title,
      score,
      season,
      year,
      trailer,
      synopsis,
    })
  );
};

const convertDetailAnime = (data: DetailAnimeType) => ({
  mal_id: data.mal_id,
  images: data.images,
  title: data.title,
  score: data.score,
  season: data.season,
  year: data.year,
  trailer: data.trailer,
  synopsis: data.synopsis,
  title_synonyms: data.title_synonyms,
  type: data.type,
  episodes: data.episodes,
  aired: {
    from: data.aired.from,
  },
  duration: data.duration,
  rating: data.rating,
  scored_by: data.scored_by,
  studios: data.studios,
  genres: data.genres,
});

export const getTopAnime = async ({
  limit = 25,
  page = 1,
}: {
  limit?: number;
  page?: number;
}): Promise<AnimeDatasType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=${limit}&page=${page}`,
    {
      cache: "force-cache",
    }
  );
  const datas = await response.json();
  return { pagination: datas.pagination, data: convertDataAnime(datas.data) };
};

export const searchAnime = async (query: string): Promise<AnimeDatasType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${query}`
  );
  const datas = await response.json();
  return { pagination: datas.pagination, data: convertDataAnime(datas.data) };
};

export const getDetailAnime = async (
  mal_id: number
): Promise<DetailAnimeType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${mal_id}/full`
  );
  const data = await response.json();
  const result: DetailAnimeType = convertDetailAnime(data.data);

  return result;
};

export const getRecommendationAnime = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations/anime`
  );
  const datas = await response.json();
  const result = datas.data.flatMap((item: any) => item.entry);
  return result;
  // const result: RecommendationAnimeType[] = datas.data.map((item: any) => [
  //   ...item.entry,
  // ]);
  // let recommendations: RecommendationAnimeType[] = [];
  // return result.reduce(
  //   (prev, currItem) => prev.concat(currItem),
  //   recommendations
  // );
};

export const randomAnime = (datas: any, gap: number) => {
  const first = ~~(Math.random() * (datas.length - gap) + 1);
  const last = gap + first;
  return datas.slice(first, last);
};
