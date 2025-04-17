import { currentUser } from "@clerk/nextjs";
import EmailMarketingComponent from "@/components/EmailMarketing";
import { onGetAllCampaigns, onGetAllCustomers } from "@/actions/e-mail";
import Header from "@/components/Header";

const EmailMarketing = async () => {
  const user = await currentUser();

  if (!user) return null;

  const customers = await onGetAllCustomers(user.id);
  const campaigns = await onGetAllCampaigns(user.id);

  return (
    <div className="flex flex-col p-4 mb-10 w-full">
      <Header />

      <div className="w-full flex flex-col gap-15">
        <EmailMarketingComponent
          campaign={campaigns?.campaign}
          subscription={customers?.subscription}
          domains={customers?.domains}
        />
      </div>
    </div>
  );
};

export default EmailMarketing;
