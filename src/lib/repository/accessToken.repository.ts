import { AccessToken } from "@prisma/client";
import prisma from "@/lib/commons/prisma";
import { ExtendedAccessTokenEntity } from "@/lib/models/extendedEntities/extendedAccessTokenEntity";

export class AccessTokenRepository {
  async createAccessToken(token: AccessToken): Promise<AccessToken | null> {
    const createdAccessToken = await prisma.accessToken.create({
      data: token,
    });
    return createdAccessToken;
  }

  async findById(id: string): Promise<AccessToken | null> {
    const token = await prisma.accessToken.findUnique({
      where: {
        id,
      },
    });
    return token;
  }

  async findByToken(token: string): Promise<ExtendedAccessTokenEntity | null> {
    const querytoken = await prisma.accessToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
    return querytoken;
  }

  async findByPredicate(predicate: {}): Promise<
    AccessToken[] | ExtendedAccessTokenEntity[]
  > {
    const tokens = await prisma.accessToken.findMany({
      where: {
        ...predicate,
      },
    });
    return tokens;
  }
}
