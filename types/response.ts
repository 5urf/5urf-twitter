import { Prisma } from '@prisma/client';

export type ResponseBase = Prisma.ResponseGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
      };
    };
  };
}>;

export type ResponseType = ResponseBase & {
  isPending?: boolean;
};
