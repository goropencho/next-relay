import { AccessToken, User } from "@prisma/client";

export interface ExtendedAccessTokenEntity extends AccessToken {
  user: User | null;
}
