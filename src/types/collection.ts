export type payloadCollectionType = {
  anime_mal_id: number;
  owner_id: number;
  anime_image: string;
  anime_title: string;
};

export type DetailCollectionType = {
  anime_mal_id: number;
  owner_id: number;
};

export type ResponseCollectionType = payloadCollectionType & {
  id: number;
  created_at: Date;
  updated_at: Date;
};
