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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=${limit}&page=${page}&sfw=true`,
    {
      cache: "force-cache",
    }
  );
  const datas = await response.json();
  return { pagination: datas.pagination, data: convertDataAnime(datas.data) };
};

export const searchAnime = async (query: string): Promise<AnimeDatasType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${query}&sfw=true`
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations/anime?sfw=true`
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

export const addCollection = async ({
  data,
}: {
  data: { mal_id: number; anime_image: string; anime_title: string };
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/collection`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const responseJson = await response.json();
  if (!response.ok) throw new Error("Something wrong when add collection");
  return responseJson.data;
};

export const getCollectionByMalId = async (mal_id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/collection/${mal_id}`
  );
  const responseJson = await response.json();
  return responseJson.data;
};

export const deleteCollectionByMalId = async (mal_id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/collection/${mal_id}`,
    {
      method: "DELETE",
    }
  );
  const responseJson = await response.json();
  if (!response.ok) throw new Error("Something wrong when delete collection");
  return responseJson.data;
};

export const getCollections = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/collection`,
    {
      next: {
        revalidate: 3,
      },
    }
  );
  const responseJson = await response.json();
  return responseJson.data;
};

export const addComment = async ({
  anime_mal_id,
  comment,
}: {
  anime_mal_id: number;
  comment: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ anime_mal_id, comment }),
    }
  );
  const responseJson = await response.json();
  if (!response.ok) throw new Error("Something wrong when add comment");
  return responseJson.data;
};

export const getCommentsByAnimeMalId = async (anime_mal_id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/comment/${anime_mal_id}`,
    {
      cache: "no-store",
    }
  );
  const responseJson = await response.json();
  return responseJson.data;
};

export const getComments = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/comment`,
    {
      next: {
        revalidate: 3,
      },
    }
  );
  const responseJson = await response.json();
  return responseJson.data;
};

export const deleteCommentByCommentId = async (commentId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/comment/${commentId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Something wrong when delete comment");
  }
  const responseJson = await response.json();
  return responseJson.data;
};

export const upVoteCommentByCommentId = async (commentId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/comment/${commentId}/up-vote`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    throw new Error("Something wrong when up-vote comment");
  }
  const responseJson = await response.json();
  return responseJson.data;
};

export const neutralVoteCommentByCommentId = async (commentId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/comment/${commentId}/neutral-vote`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    throw new Error("Something wrong when neutral-vote comment");
  }
  const responseJson = await response.json();
  return responseJson.data;
};

export const downVoteCommentByCommentId = async (commentId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/comment/${commentId}/neutral-vote`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    throw new Error("Something wrong when neutral-vote comment");
  }
  const responseJson = await response.json();
  return responseJson.data;
};
