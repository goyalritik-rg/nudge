"use server";

import { client } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";
import subscriptionPlans from "@/config/subscription-plans";
import { currentUser } from "@clerk/nextjs";

export async function POST(req) {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      subscription_id,
      planId,
    } = await req.json();

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const user = await client.user.findUnique({
      where: { clerkId: clerkUser.id },
      select: { id: true },
    });

    const userId = user.id;

    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Invalid payment signature:", {
        razorpay_payment_id,
        razorpay_subscription_id,
      });
      return Response.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Fetch subscription with retry logic
    let subscription = null;
    let attempts = 0;
    const maxAttempts = 5;
    const retryDelay = 2000; // 2 seconds

    while (attempts < maxAttempts) {
      subscription = await razorpay.subscriptions.fetch(subscription_id);
      console.log(
        "Fetched Subscription (Attempt",
        attempts + 1,
        "):",
        subscription
      );

      if (subscription && subscription.status === "active") {
        break;
      }

      attempts++;

      if (attempts < maxAttempts) {
        console.log(`Subscription not active, retrying in ${retryDelay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    if (!subscription) {
      console.error("Subscription not found:", subscription_id);

      return Response.json(
        { success: false, message: "Subscription not found" },
        { status: 404 }
      );
    }

    if (subscription.status !== "active") {
      console.error("Subscription not active:", {
        status: subscription.status,
        subscription_id,
      });

      return Response.json(
        {
          success: false,
          message: "Subscription is not active",
          status: subscription.status,
        },
        { status: 400 }
      );
    }

    const chosenPlan = subscriptionPlans.find((p) => p.planId === planId);

    if (!chosenPlan) {
      console.error("Invalid plan ID:", planId);

      return Response.json(
        { success: false, message: "Invalid plan ID" },
        { status: 400 }
      );
    }

    // // Verify the payment amount (in paise)
    // if (payment.amount !== chosenPlan.price * 100) {
    //   console.error("Payment amount mismatch:", {
    //     payment_amount: payment.amount,
    //     expected_amount: chosenPlan.price * 100,
    //   });
    //   return Response.json(
    //     { success: false, message: "Payment amount does not match plan price" },
    //     { status: 400 }
    //   );
    // }

    const existing = await client.razorpaySubscription.findUnique({
      where: { userId },
    });

    await client.razorpaySubscription.update({
      where: { id: existing.id },
      data: {
        razorpayId: subscription_id,
        planId,
        currentStart: new Date(subscription.start_at * 1000),
        currentEnd: subscription.end_at
          ? new Date(subscription.end_at * 1000)
          : null,
        emails: chosenPlan.emails,
        createdAt: new Date(),
      },
    });

    return Response.json({ success: true, message: "Subscription activated" });
  } catch (error) {
    console.error("Error confirming payment:", error);
    return Response.json(
      { success: false, message: "Failed to confirm payment" },
      { status: 500 }
    );
  }
}
