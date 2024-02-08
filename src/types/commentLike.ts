export type PayloadCommentLikeType = {
  comment_id: number;
  owner_id: number;
};

export type ResponseCommentLikeType = PayloadCommentLikeType & {
  id: number;
  vote: boolean | null;
  created_at: Date;
  updated_at: Date;
};

export type UpVoteType = {
  comment_id: number;
  owner_id: number;
};
