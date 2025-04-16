import { getCurrentSubscriptionPlan } from "@/actions/settings";
import Modal from "@/common/components/Modal";
import Section from "@/common/components/Section";
import subscriptionPlans from "@/config/subscription-plans";
import { CheckCircle2, Plus, PlusCircle } from "lucide-react";
import Image from "next/image";

const BillingSettings = async () => {
  const plan = await getCurrentSubscriptionPlan();

  const planFeatures = subscriptionPlans.find(
    (card) => card.title.toUpperCase() === plan?.toUpperCase()
  )?.features;

  if (!planFeatures) {
    return;
  }

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
            {!plan || plan === "STANDARD" ? (
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

            <Modal.Body className="mt-0 mb-15">Body</Modal.Body>
          </Modal.Content>
        </Modal>
      </div>

      {/* <div className="lg:col-span-2 flex justify-start lg:justify-center ">
        <Modal
          title="Choose A Plan"
          description="Tell us about yourself! What do you do? Let’s tailor your experience so it best suits you."
          trigger={
            plan && plan === 'STANDARD' ? (
              <Card className="border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
                <CardContent className="flex gap-2 items-center">
                  <div className="rounded-full border-2 p-1">
                    <Plus className="text-gray-400" />
                  </div>
                  <CardDescription className="font-semibold">
                    Upgrade Plan
                  </CardDescription>
                </CardContent>
              </Card>
            ) : (
              <Image
                src="/images/creditcard.png"
                width={400}
                height={400}
                alt="image"
              />
            )
          }
        >
          <SubscriptionForm plan={plan!} />
        </Modal>
      </div> */}

      <div className="lg:col-span-2">
        <h3 className="text-md mb-2">Current Plan</h3>

        <p className="text-xl font-semibold">{plan}</p>

        <div className="flex gap-2 flex-col mt-2">
          {planFeatures.map((feature) => (
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
