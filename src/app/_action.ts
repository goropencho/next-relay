"use server";

import prisma from "@/lib/commons/prisma";
import { CreateAccessToken } from "@/lib/schemas/accessToken";
import { makeid } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createAccessToken(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { email } = CreateAccessToken.parse(values);
  const checkIfAlreadyExists = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      accessToken: true,
    },
  });

  if (checkIfAlreadyExists) {
    throw new Error("User Already Exists");
  }

  const createdAccessToken = await prisma.user.create({
    data: {
      email: email,
      accessToken: {
        create: {
          token: makeid(),
        },
      },
    },
    select: {
      accessToken: {
        select: {
          token: true,
        },
      },
    },
  });

  revalidatePath("/");
  return createdAccessToken.accessToken[0].token;
}
