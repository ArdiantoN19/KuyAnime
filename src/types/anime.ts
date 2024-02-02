export type ImageTypeURL = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

export type ImagesType = {
  jpg: ImageTypeURL;
  webp: ImageTypeURL;
};

export type AnimeType = {
  mal_id: number;
  title: string;
  score: number;
  season: string;
  year: number;
  synopsis: string;
};

export type PaginationType = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

export type TrailerType = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: ImagesType & {
    medium_image_url: string;
    maximum_image_url: string;
  };
};

export type AnimeDataType = AnimeType & {
  images: ImagesType;
  trailer: TrailerType;
};

export type AnimeDatasType = {
  pagination: PaginationType;
  data: AnimeDataType[];
};

export const initialAnimeValue: AnimeDatasType = {
  pagination: {
    last_visible_page: 0,
    has_next_page: false,
    current_page: 0,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
  },
  data: [],
};

export type GenreType = {
  mal_id: number;
  type: string;
  name: string;
};

export type StudioType = {
  mal_id: number;
  name: string;
  type: string;
};

export type DetailAnimeType = AnimeDataType & {
  title_synonyms: string;
  type: string;
  episodes: number;
  aired: {
    from: string;
  };
  duration: string;
  rating: string;
  scored_by: number;
  studios: StudioType[];
  genres: GenreType[];
};

export type RecommendationAnimeType = ImagesType & {
  mal_id: number;
  url: string;
  title: string;
};
