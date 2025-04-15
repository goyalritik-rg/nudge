"use server";

import { client } from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { getAllUserDomains } from "../settings";

export const onCompleteUserRegistration = async (fullname, clerkId, type) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const getUser = async () => {
  const user = await currentUser();

  if (!user) {
    redirectToSignIn();
    return;
  }

  try {
    const userData = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (userData) {
      const domains = await getAllUserDomains();

      return { status: 200, user: userData, domains: domains?.domains };
    }
  } catch (error) {
    return { status: 400 };
  }
};
