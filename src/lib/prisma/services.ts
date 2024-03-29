import prisma from "@/lib/prisma";
import {
  DetailCollectionType,
  payloadCollectionType,
  ResponseCollectionType,
} from "@/types/collection";
import { PayloadCommentType, ResponseCommentType } from "@/types/comment";
import {
  PayloadCommentLikeType,
  ResponseCommentLikeType,
  UpVoteType,
} from "@/types/commentLike";
import { RegisterUserType, ResponseRegisterUserType } from "@/types/user";

const responseService = <T>(statusCode: number, data: T, message?: string) => {
  if (statusCode === 200 || statusCode === 201) {
    return { statusCode, status: "success", data: data as T };
  }
  return { statusCode, status: "fail", data, message: message };
};

const checkAvailableUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};

export const registerUser = async (data: RegisterUserType) => {
  try {
    const user = await checkAvailableUser(data.email);
    let response;

    if (!user) {
      response = await prisma.user.create({
        data,
      });
    } else {
      response = await prisma.user.update({
        where: { email: data.email },
        data,
      });
    }
    return responseService<ResponseRegisterUserType>(
      200,
      response as ResponseRegisterUserType
    );
  } catch (error: any) {
    return responseService(400, {}, error.message);
  }
};

export const checkAvailableCollection = async (
  anime_mal_id: number,
  owner_id: number
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      anime_mal_id,
      owner_id,
    },
  });
  return collection;
};

export const postCollection = async (data: payloadCollectionType) => {
  try {
    const response = await prisma.collection.create({
      data,
    });

    return responseService<ResponseCollectionType>(
      201,
      response as ResponseCollectionType
    );
  } catch (error: any) {
    return responseService(400, {}, error.message);
  }
};

export const deleteCollection = async (data: DetailCollectionType) => {
  try {
    const response = await prisma.collection.delete({
      where: {
        anime_mal_id_owner_id: {
          anime_mal_id: data.anime_mal_id,
          owner_id: data.owner_id,
        },
      },
    });
    return responseService<ResponseCollectionType>(
      200,
      response as ResponseCollectionType
    );
  } catch (error: any) {
    return responseService(404, {}, error.message);
  }
};

export const getCollectionByEmailandMalId = async (
  data: DetailCollectionType
) => {
  try {
    const collection = await checkAvailableCollection(
      data.anime_mal_id,
      data.owner_id
    );
    if (!collection) {
      throw new Error("Cannot find data, check anime mal id and owner id");
    }
    return responseService(200, collection as ResponseCollectionType);
  } catch (error: any) {
    return responseService(404, {}, error.message);
  }
};

export const getCollections = async (owner_id: number) => {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        owner_id,
      },
    });
    return responseService(200, collections as ResponseCollectionType[]);
  } catch (error: any) {
    return responseService(500, {}, error.message);
  }
};

export const addComment = async (data: PayloadCommentType) => {
  try {
    const comment = await prisma.comment.create({ data });
    return responseService<ResponseCommentType>(
      201,
      comment as ResponseCommentType
    );
  } catch (error: any) {
    return responseService(400, {}, error);
  }
};

export const getCommentsByAnimeMalId = async (anime_mal_id: number) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        anime_mal_id,
      },
      include: {
        owner: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    if (!comments.length) {
      throw new Error("Cannot find comments, check anime mal id");
    }
    return responseService<ResponseCommentType[]>(
      200,
      comments as ResponseCommentType[]
    );
  } catch (error: any) {
    return responseService(404, {}, error.message);
  }
};

export const getComments = async (owner_id: number) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        owner_id,
      },
      include: {
        owner: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return responseService<ResponseCommentType[]>(
      200,
      comments as ResponseCommentType[]
    );
  } catch (error: any) {
    return responseService(500, {}, error.message);
  }
};

export const deleteCommentByCommentId = async (commentId: number) => {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return responseService<ResponseCommentType>(
      200,
      comment as ResponseCommentType
    );
  } catch (error: any) {
    return responseService(404, {}, error);
  }
};

export const getUpVoteComment = async () => {
  try {
    const upVotes = await prisma.commentLike.findMany({
      where: {
        vote: true,
      },
      select: {
        owner_id: true,
        comment_id: true,
      },
    });
    return responseService<UpVoteType[]>(200, upVotes as UpVoteType[]);
  } catch (error: any) {
    return responseService(500, [], error.message);
  }
};

export const getDownVoteComment = async () => {
  try {
    const upVotes = await prisma.commentLike.findMany({
      where: {
        vote: false,
      },
      select: {
        owner_id: true,
        comment_id: true,
      },
    });
    return responseService<UpVoteType[]>(200, upVotes as UpVoteType[]);
  } catch (error: any) {
    return responseService(500, [], error.message);
  }
};

export const checkAvailableCommentLikeByUserIdAndCommentId = async (
  data: PayloadCommentLikeType
) => {
  const commentLike = await prisma.commentLike.findFirst({
    where: {
      comment_id: data.comment_id,
      owner_id: data.owner_id,
    },
  });
  return commentLike;
};

export const upVoteCommentByUserIdAndCommentId = async (
  data: PayloadCommentLikeType
) => {
  try {
    const commentLike = await checkAvailableCommentLikeByUserIdAndCommentId(
      data
    );
    let response;
    if (commentLike) {
      response = await prisma.commentLike.update({
        where: {
          comment_id_owner_id: {
            comment_id: data.comment_id,
            owner_id: data.owner_id,
          },
        },
        data: {
          vote: true,
        },
      });
    } else {
      response = await prisma.commentLike.create({
        data: {
          ...data,
          vote: true,
        },
      });
    }

    return responseService<ResponseCommentLikeType>(
      201,
      response as ResponseCommentLikeType
    );
  } catch (error: any) {
    return responseService(400, {}, error.message);
  }
};

export const downVoteCommentByUserIdAndCommentId = async (
  data: PayloadCommentLikeType
) => {
  try {
    const commentLike = await checkAvailableCommentLikeByUserIdAndCommentId(
      data
    );
    let response;
    if (commentLike) {
      response = await prisma.commentLike.update({
        where: {
          comment_id_owner_id: {
            comment_id: data.comment_id,
            owner_id: data.owner_id,
          },
        },
        data: {
          vote: false,
        },
      });
    } else {
      response = await prisma.commentLike.create({
        data: {
          ...data,
          vote: false,
        },
      });
    }

    return responseService<ResponseCommentLikeType>(
      200,
      response as ResponseCommentLikeType
    );
  } catch (error: any) {
    return responseService(400, {}, error.message);
  }
};

export const neutralVoteCommentByUserIdAndCommentId = async (
  data: PayloadCommentLikeType
) => {
  try {
    const commentLike = await checkAvailableCommentLikeByUserIdAndCommentId(
      data
    );
    if (!commentLike) {
      throw new Error("Cannot find comment like");
    }

    const response = await prisma.commentLike.update({
      where: {
        comment_id_owner_id: {
          comment_id: data.comment_id,
          owner_id: data.owner_id,
        },
      },
      data: {
        vote: null,
      },
    });

    return responseService<ResponseCommentLikeType>(
      200,
      response as ResponseCommentLikeType
    );
  } catch (error: any) {
    return responseService(400, {}, error.message);
  }
};
