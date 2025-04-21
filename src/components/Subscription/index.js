"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import subscriptionPlans from "@/config/subscription-plans";
import { useDashboardContext } from "@/context/dashboard-context";
import Button from "@/common/components/Button";
import { useState } from "react";
import Modal from "@/common/components/Modal";
import { toast } from "sonner";
import Section from "@/common/components/Section";

const Subscription = () => {
  const { subscription, user, refreshDashboard } = useDashboardContext();

  const { email, name: fullname } = user || {};

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!subscription) {
    return null;
  }

  const { planId: currentPlan } = subscription;

  const handlePlanChange = async () => {
    if (!selectedPlan?.planId) return;

    setLoading(true);

    try {
      const response = await fetch("/api/razorpay/subscribe", {
        method: "POST",
        body: JSON.stringify({ planId: selectedPlan.planId }),
        headers: { "Content-Type": "application/json" },
      });

      const { success, options, subscription, message } = await response.json();

      if (!success) {
        toast.info(message || "Failed to initiate payment.");
        return;
      }

      const moreOptions = {
        name: "NUDGE AI",
        description: "Monthly Subscription",
        prefill: { name: fullname, email },
        theme: { color: "#6366f1" },
        modal: {
          ondismiss: () => {
            console.log("Payment process was cancelled");
            toast.info("Payment process was cancelled.");
          },
          escape: true,
          handleback: true,
        },
        retry: { enabled: true, max_count: 3 },
        handler: async (response) => {
          try {
            const confirmRes = await fetch("/api/razorpay/confirm", {
              method: "POST",
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
                subscription_id: subscription.id,
                planId: subscription.plan_id,
              }),
              headers: { "Content-Type": "application/json" },
            });

            const confirmData = await confirmRes.json();

            if (confirmData.success) {
              toast.success("Subscription activated!");
              refreshDashboard();
            } else {
              toast.error(confirmData.message);
            }
          } catch (err) {
            console.error("Error confirming payment:", err);
            toast.error("An error occurred while confirming the payment.");
          }
        },
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay({ ...options, ...moreOptions });
        razorpay.open();
      } else {
        toast.error("Unable to initiate payment. Razorpay script not loaded.");
      }
    } catch (error) {
      console.error("Error handling plan change:", error);
      toast.error("An error occurred during payment.");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="w-full">
      <Section
        label="Billing settings"
        message="Add payment information, upgrade and modify your plan."
        className="lg:col-span-1"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {subscriptionPlans.map((plan) => {
          const isCurrent = plan.planId === currentPlan;
          const currentIndex = subscriptionPlans.findIndex(
            (p) => p.planId === currentPlan
          );
          const planIndex = subscriptionPlans.findIndex(
            (p) => p.planId === plan.planId
          );
          const isUpgrade = planIndex > currentIndex;

          return (
            <div
              key={plan.planId}
              className={`border rounded-2xl p-6 shadow-md flex flex-col justify-between ${
                isCurrent ? "border-orange-500" : "border-gray-200"
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {plan.price ? `₹ ${plan.price}` : "Free"}
                    </p>
                    <p className="text-xl font-semibold">({plan.title})</p>
                  </div>
                  {isCurrent ? (
                    <Badge className="bg-orange-100 text-orange-800">
                      Current Plan
                    </Badge>
                  ) : null}
                </div>
                <ul className="text-sm mt-4 space-y-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                {isCurrent ? null : (
                  <Button
                    type={isUpgrade ? "default" : "outline"}
                    className="w-full"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setConfirmOpen(true);
                    }}
                    disabled={loading}
                  >
                    {isUpgrade ? "Upgrade" : "Downgrade"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={confirmOpen} setShow={setConfirmOpen}>
        <Modal.Content>
          <Modal.Header
            title="Confirm Plan Change"
            description={
              <span className="mt-2">
                Are you sure you want to switch to the{" "}
                <strong className="text-neutral-950">
                  {selectedPlan?.title}
                </strong>{" "}
                plan?
              </span>
            }
          />
          <Modal.Footer className="mt-6">
            <Button
              type="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handlePlanChange} loading={loading}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Subscription;
