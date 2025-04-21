"use client";

import Modal from "@/common/components/Modal";
import Section from "@/common/components/Section";
import subscriptionPlans from "@/config/subscription-plans";
import GLOBAL_CONSTANTS from "@/constants";
import { useDashboardContext } from "@/context/dashboard-context";
import { CheckCircle2, PlusCircle } from "lucide-react";
import Image from "next/image";

const BillingSettings = () => {
  const { subscription } = useDashboardContext();

  if (!subscription) {
    return;
  }

  const { planId } = subscription;

  const currentPlan = subscriptionPlans.find((p) => p.planId === planId);

  const { features, title } = currentPlan || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <Section
        label="Billing settings"
        message="Add payment information, upgrade and modify your plan."
        className="lg:col-span-1"
      />

      <div className="lg:col-span-2 flex justify-start">
        <Modal>
          <Modal.Trigger>
            {planId === GLOBAL_CONSTANTS.subscriptions_plan_id.STANDARD ? (
              <div className="border border-dashed bg-neutral-400/15 border-neutral-950/50 rounded-2xl w-full md:w-[400px] cursor-pointer h-[220px] flex justify-center items-center gap-2">
                <PlusCircle className="text-muted-foreground" />

                <div className="font-medium text-muted-foreground">
                  Upgrade Plan
                </div>
              </div>
            ) : (
              <Image
                src="/images/creditcard.png"
                width={400}
                height={400}
                alt="image"
              />
            )}
          </Modal.Trigger>

          <Modal.Content>
            <Modal.Header
              title="Choose A Plan"
              description="Tell us about yourself! What do you do? Let’s tailor your experience so it best suits you."
            />

            <Modal.Body className="mt-0 mb-15">Body </Modal.Body>
          </Modal.Content>
        </Modal>
      </div>

      <div className="lg:col-span-2">
        <h3 className="text-md mb-2">Current Plan</h3>

        <p className="text-xl font-semibold">{title}</p>

        <div className="flex gap-2 flex-col mt-2">
          {features.map((feature) => (
            <div key={feature} className="flex gap-2">
              <CheckCircle2 className="text-muted-foreground" />

              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
