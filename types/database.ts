import { Prisma } from '@prisma/client';

// User
export type PrivateUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    email: true;
    bio: true;
    created_at: true;
  };
}>;

export type PublicUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    bio: true;
    created_at: true;
  };
}>;

// Tweet
export type TweetWithAuthor = Prisma.TweetGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
      };
    };
  };
}>;

export type TweetWithCounts = Prisma.TweetGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
    _count: {
      select: {
        likes: true;
        responses: true;
      };
    };
  };
}>;

export type TweetDetail = Prisma.TweetGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
      };
    };
    _count: {
      select: {
        likes: true;
      };
    };
  };
}>;

// Response
export type Response = Prisma.ResponseGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
      };
    };
  };
}>;

export type PendingResponse = Response & {
  isPending?: boolean;
};

// Like
export type LikeStatus = {
  isLiked: boolean;
  likeCount: number;
};

// Search
export type SearchResult = {
  tweets: TweetWithCounts[];
  totalPages: number;
};

// Pagination
export type PaginationResult<T> = {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
