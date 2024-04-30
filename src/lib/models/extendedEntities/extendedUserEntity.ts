import { AccessToken, User } from "@prisma/client";

export interface ExtendedUserEntity extends User {
  accessToken: AccessToken | null;
}
