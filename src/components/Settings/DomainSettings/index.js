import { getDomainDetails } from "@/actions/settings";
import SettingsForm from "./SettingsForm";
import { redirect } from "next/navigation";
import BotTraining from "./BotTraining";
import Separator from "@/common/components/Separator";
import Products from "./Products";

const DomainSettings = async ({ params = {} }) => {
  const domainData = await getDomainDetails(params.domain);

  if (!domainData) {
    redirect("/dashboard");
  }

  const { domains = [] } = domainData || {};

  const { chatBot, id, name, products = [] } = domains?.[0] || {};

  if (!id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col p-4 mb-10 w-full">
      <div className="flex flex-col mb-16">
        <h2 className="text-3xl font-bold capitalize">Domain - {name}</h2>

        <p className="text-gray-500 text-sm mt-1">
          Modify domain settings, change chatbot options, enter sales questions
          and train your bot to do what you want it to.
        </p>
      </div>

      <div className="w-full flex flex-col gap-15">
        <SettingsForm chatBot={chatBot} id={id} name={name} />

        <Separator />

        <BotTraining id={id} />

        <Separator />

        <Products id={id} products={products || []} />
      </div>
    </div>
  );
};

export default DomainSettings;
