export type PayloadCommentType = {
  anime_mal_id: number;
  comment: string;
  owner_id: number;
};

export type ResponseCommentType = PayloadCommentType & {
  id: number;
  created_at: Date;
  updated_at: Date;
  owner: {
    name: string;
    image: string;
  };
};

export type ResponseCommentApiType = ResponseCommentType & {
  upVoteBy: number[];
  downVoteBy: number[];
};
