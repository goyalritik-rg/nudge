import { client } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers.get("x-razorpay-signature");
  const body = await req.text();

  // Verify the webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    console.warn("⚠️ Invalid Razorpay signature");
    return new Response("Invalid Signature", { status: 400 });
  }

  const event = JSON.parse(body);

  try {
    switch (event.event) {
      case "subscription.charged":
      case "payment.authorized": {
        const sub = event.payload.subscription?.entity;

        if (!sub) break;

        await client.razorpaySubscription.updateMany({
          where: { razorpayId: sub.id },
          data: {
            status: sub.status,
            currentStart: new Date(sub.start_at * 1000),
            currentEnd: new Date(sub.end_at * 1000),
          },
        });

        break;
      }

      case "subscription.cancelled": {
        const sub = event.payload.subscription?.entity;

        if (!sub) break;

        await client.razorpaySubscription.updateMany({
          where: { razorpayId: sub.id },
          data: {
            status: "cancelled",
          },
        });

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return new Response("Webhook handled", { status: 200 });
  } catch (err) {
    console.error("❌ Error handling Razorpay webhook:", err);
    return new Response("Webhook processing error", { status: 500 });
  }
}
