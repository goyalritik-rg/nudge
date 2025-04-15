import { getDomainDetails } from "@/actions/settings";
import Header from "../../Header";
import SettingsForm from "./SettingsForm";
import { redirect } from "next/navigation";
import BotTraining from "./BotTraining";
import Separator from "@/common/components/Separator";

const DomainSettings = async ({ params = {} }) => {
  const domainData = await getDomainDetails(params.domain);

  if (!domainData) {
    redirect("/dashboard");
  }

  const { subscription = {}, domains = [] } = domainData || {};

  const { chatBot, id, name } = domains?.[0] || {};

  if (!id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col p-3 md:p-6 ml-4 mb-10 w-full">
      <Header />

      <div className="w-full flex flex-col gap-15 overflow-y-auto">
        <SettingsForm
          plan={subscription?.plan}
          chatBot={chatBot}
          id={id}
          name={name}
        />

        <Separator />

        <BotTraining id={id} />
      </div>
    </div>
  );
};

export default DomainSettings;
