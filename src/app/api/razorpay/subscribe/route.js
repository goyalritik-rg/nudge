"use server";

import subscriptionPlans from "@/config/subscription-plans";
import { client } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { currentUser } from "@clerk/nextjs";

const FREE_PLAN = {
  planId: "free",
  emails: 100,
};

// Cancel existing Razorpay subscription if it exists
async function cancelExistingRazorpaySubscription(subscriptionId) {
  if (!subscriptionId) return; // Nothing to cancel for free plan
  try {
    const cancelled = await razorpay.subscriptions.cancel(subscriptionId);
    if (cancelled.status !== "cancelled") {
      throw new Error("Failed to cancel Razorpay subscription");
    }
  } catch (err) {
    console.error("Error cancelling subscription:", err);
    throw err;
  }
}

// Create new Razorpay subscription with provided start and end dates
async function createRazorpaySubscription(planId, customerId) {
  if (!customerId) {
    return Response.json({ success: false, message: "No Customer Found" });
  }

  const subscription = await razorpay.subscriptions.create({
    plan_id: planId,
    customer_notify: 1,
    // start_at: Math.floor(Date.now() / 1000),
    total_count: 12,
    customer_id: customerId,
  });

  return subscription;
}

// Store or update subscription in DB
async function upsertSubscription(userId, data) {
  await client.razorpaySubscription.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
}

// Handle POST
export async function POST(req) {
  const { planId } = await req.json();

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return Response.json({ error: "User not found" }, { status: 401 });
  }

  const user = await client.user.findUnique({
    where: { clerkId: clerkUser.id },
    select: { id: true },
  });

  const userId = user.id;

  try {
    const existing = await client.razorpaySubscription.findUnique({
      where: { userId },
    });

    // Case: Switching to Free Plan
    if (planId === "free") {
      if (existing?.razorpayId) {
        await cancelExistingRazorpaySubscription(existing.razorpayId);
      }

      await upsertSubscription(userId, {
        razorpayId: null,
        planId: FREE_PLAN.planId,
        currentStart: new Date(),
        currentEnd: null,
        emails: FREE_PLAN.emails,
        createdAt: new Date(),
      });

      return Response.json({ success: true, message: "Switched to Free Plan" });
    }

    // Case: Switching to Paid Plan
    const chosenPlan = subscriptionPlans.find((p) => p.planId === planId);

    if (!chosenPlan) {
      return Response.json({ error: "Invalid plan ID" }, { status: 400 });
    }

    if (existing?.razorpayId) {
      await cancelExistingRazorpaySubscription(existing.razorpayId);
    }

    const { customerId } = existing || {};
    const razorpaySub = await createRazorpaySubscription(planId, customerId);

    if (razorpaySub?.id) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: razorpaySub.id,
        // Move handler to client-side
        handler: function (response) {
          // This will be overridden client-side
          console.log("Payment Response:", response);
        },
      };

      return Response.json({
        success: true,
        options,
        subscription: razorpaySub,
      });
    }

    return Response.json({ success: false, message: "Payment failed" });
  } catch (error) {
    console.error("Subscription error:", error);
    return Response.json(
      { error: "Failed to manage subscription" },
      { status: 500 }
    );
  }
}
