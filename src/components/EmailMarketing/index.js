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
    controlEmail,
  } = useEmailMarketing();

  return (
    <div className="w-full flex flex-col items-start">
      <CreateCampaign
        control={control}
        errors={errors}
        onAddCustomersToCampaign={onAddCustomersToCampaign}
        isSelected={isSelected}
        loading={loading}
        subscription={subscription}
        onCreateCampaign={onCreateCampaign}
      />

      <Separator className="my-6" />

      <ListCampaigns
        campaign={campaign}
        campaignId={campaignId}
        onSelectCampaign={onSelectCampaign}
        processing={processing}
        control={controlEmail}
        errors={emailErrors}
        onCreateEmailTemplate={onCreateEmailTemplate}
        setValue={setValue}
        onBulkEmail={onBulkEmail}
      />

      <Separator className="my-12" />

      <CustomerTable
        domains={domains}
        onId={onSetAnswersId}
        onSelect={onSelectedEmails}
        select={isSelected}
        id={isId}
      />
    </div>
  );
};

export default EmailMarketing;
