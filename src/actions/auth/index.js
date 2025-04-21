"use server";

import { client } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export const onCompleteUserRegistration = async (
  fullname,
  clerkId,
  type,
  email
) => {
  try {
    const razorpayCustomer = await razorpay.customers.create({
      name: fullname,
      email,
    });

    if (!razorpayCustomer) {
      console.error("Razorpay registration failed:", error);
      return { status: 400, error: "User registration failed" };
    }

    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        email,
        subscription: {
          create: {
            razorpayId: null,
            currentStart: new Date(),
            currentEnd: null,
            customerId: razorpayCustomer.id,
          },
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
    console.error("User registration failed:", error);
    return { status: 400, error: "User registration failed" };
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
        createdAt: true,
        razorpayContactId: true,
        razorpayFundAccountId: true,
        payoutEnabled: true,
        payoutPercentage: true,
        domains: true,
        subscription: true,
      },
    });

    return userData;
  } catch (error) {
    console.log(error);
  }
};
