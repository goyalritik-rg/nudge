"use client";

import Modal from "@/common/components/Modal";
import { Plus } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Layout from "@/common/form/Layout";
import Button from "@/common/components/Button";
import useCampaign from "@/hooks/useCampaign";
import CampaignCard from "./CampaignCard";
import { useEffect, useState } from "react";
import DomainSelect from "../Conversation/DomainSelect";
import LoaderWrapper from "@/common/components/LoaderWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboardContext } from "@/context/dashboard-context";

const Campaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");

  const { replace } = useRouter();

  const { subscription } = useDashboardContext();

  const searchParams = useSearchParams();

  const domainId = searchParams.get("domainId");

  const {
    control,
    errors,
    onCreateCampaign,
    loading,
    campaigns,
    loadingCampaigns,
    getAllCampaigns,
    customers: allCustomers = [],
  } = useCampaign({ domainId: selectedDomain });

  const onChangeDomain = (val) => {
    replace(`/email-marketing?domainId=${val}`);
  };

  useEffect(() => {
    setSelectedDomain(domainId);
  }, [domainId]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <DomainSelect
          setValue={onChangeDomain}
          className="w-[200px]"
          value={selectedDomain}
        />

        <div className="flex gap-8 justify-end w-full items-center">
          <div className="font-bold">{subscription?.emails} credits left</div>

          {selectedDomain ? (
            <Modal>
              <Modal.Trigger>
                <div className={buttonVariants({ variant: "outline" })}>
                  <Plus /> Create Campaign
                </div>
              </Modal.Trigger>

              <Modal.Content>
                <Modal.Header
                  title="Create a new campaign"
                  description="Add your customers and create a marketing campaign"
                />

                <Modal.Body className="mt-0 mb-15">
                  <Layout
                    control={control}
                    errors={errors}
                    controls={[
                      {
                        name: "name",
                        palceholder: "Enter campaign name",
                        type: "text",
                        label: "Campaign Name",
                      },
                    ]}
                  />
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    className="w-full"
                    loading={loading}
                    onClick={onCreateCampaign}
                  >
                    Create Campaign
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-[1%] w-full border-t border-t-neutral-300 pt-4 mt-4">
        <LoaderWrapper loading={loadingCampaigns}>
          {campaigns.length ? (
            campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                selectedCampaign={selectedCampaign}
                setSelectedCampaign={setSelectedCampaign}
                loading={loadingCampaigns}
                getAllCampaigns={getAllCampaigns}
                allCustomers={allCustomers}
              />
            ))
          ) : (
            <h3>No Campaigns Found</h3>
          )}
        </LoaderWrapper>
      </div>
    </div>
  );
};

export default Campaigns;
