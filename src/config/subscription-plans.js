import GLOBAL_CONSTANTS from "@/constants";

const subscriptionPlans = [
  {
    title: "STANDARD",
    description: "Perfect for trying out Nudge AI",
    price: 0,
    duration: "",
    highlight: "Key features",
    features: ["1 Domain", "10 Products", "100 Emails per month"],
    planId: GLOBAL_CONSTANTS.subscriptions_plan_id.STANDARD,
    emails: 100,
  },
  {
    title: "PRO",
    description: "For serious agency owners",
    price: 1999,
    duration: "month",
    highlight: "Everything in Standard, plus",
    features: ["Upto 5 Domains ", "50 Products", "500 Emails per month"],
    planId: GLOBAL_CONSTANTS.subscriptions_plan_id.PRO,
    emails: 500,
  },
  {
    title: "ULTIMATE",
    description: "The ultimate agency kit",
    price: 2999,
    duration: "month",
    highlight: "Plan for unlimited use",
    features: ["20 Domains", "Unlimited Products", "2000 Emails per month"],
    planId: GLOBAL_CONSTANTS.subscriptions_plan_id.ULTIMATE,
    emails: 10000,
  },
];

export default subscriptionPlans;
