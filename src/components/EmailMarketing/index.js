import { onGetUserSubscription } from "@/actions/e-mail";
import Header from "../Header";
import Campaigns from "./Campaigns";
import { getAllUserDomains } from "@/actions/settings";

const EmailMarketing = async () => {
  const subscription = await onGetUserSubscription();

  const domainsData = await getAllUserDomains();

  const { domains = [] } = domainsData || {};

  return (
    <div className="flex flex-col p-4 mb-10 w-full">
      <Header />

      <Campaigns subscription={subscription} domains={domains} />
    </div>
  );
};

export default EmailMarketing;
