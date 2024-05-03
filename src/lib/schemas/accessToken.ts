import { z } from "zod";

export const CreateAccessToken = z.object({
  email: z.string().min(1).email(),
});

export type CreateAccessTokenValues = z.infer<typeof CreateAccessToken>;
