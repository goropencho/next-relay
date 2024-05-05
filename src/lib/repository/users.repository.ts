import { User } from "@prisma/client";
import prisma from "../commons/prisma";
import { ExtendedUserEntity } from "../models/extendedEntities/extendedUserEntity";

export class UserRepository {
  async createUser(user: User): Promise<User> {
    let createdUser = await prisma.user.create({
      data: user,
    });
    return createdUser;
  }

  async findOneById(id: string): Promise<User | null> {
    let user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findByPredicate(predicate: {}): Promise<User[] | ExtendedUserEntity[]> {
    const user = await prisma.user.findMany({
      where: {
        ...predicate,
      },
    });
    return user;
  }
}
