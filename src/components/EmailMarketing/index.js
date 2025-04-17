"use client";

import useEmailMarketing from "@/hooks/useEmailMarketing";
import CustomerTable from "./CustomerTable";
import CreateCampaign from "./CreateCampaign";
import Separator from "@/common/components/Separator";
import ListCampaigns from "./ListCampaigns";

const EmailMarketing = ({ campaign, domains, subscription }) => {
  const {
    onSelectedEmails,
    isSelected,
    onCreateCampaign,
    errors,
    loading,
    onSelectCampaign,
    processing,
    onAddCustomersToCampaign,
    campaignId,
    onBulkEmail,
    onSetAnswersId,
    isId,
    registerEmail,
    emailErrors,
    onCreateEmailTemplate,
    setValue,
    control,
  } = useEmailMarketing();

  return (
    <div className="w-full flex flex-col items-start gap-20">
      <div className="flex w-full items-start justify-between gap-10">
        <CustomerTable
          domains={domains}
          onId={onSetAnswersId}
          onSelect={onSelectedEmails}
          select={isSelected}
          id={isId}
        />

        <Separator orientation="vertical" />

        <CreateCampaign
          control={control}
          errors={errors}
          onAddCustomersToCampaign={onAddCustomersToCampaign}
          isSelected={isSelected}
          loading={loading}
          subscription={subscription}
        />
      </div>

      <ListCampaigns
        campaign={campaign}
        campaignId={campaignId}
        onSelectCampaign={onSelectCampaign}
        processing={processing}
      />
    </div>
  );
};

export default EmailMarketing;
