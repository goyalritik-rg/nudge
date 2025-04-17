import Button from "@/common/components/Button";
import { Plus } from "lucide-react";
import React from "react";
import { Card, CardDescription } from "../ui/card";
import Modal from "@/common/components/Modal";
import Layout from "@/common/form/Layout";

const CreateCampaign = ({
  control = () => {},
  errors = {},
  onAddCustomersToCampaign = () => {},
  isSelected = [],
  loading = false,
  subscription = {},
}) => {
  return (
    <div className="flex gap-3 justify-end">
      <Button
        disabled={isSelected.length == 0}
        onClick={onAddCustomersToCampaign}
      >
        <Plus /> Add to campaign
      </Button>

      <Modal>
        <Modal.Trigger>
          <Card className="flex gap-2 items-center px-3 cursor-pointer text-sm">
            <div>
              <Plus /> Create Campaign
            </div>
          </Card>
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
            <Button className="w-full" loading={loading}>
              Create Campaign
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Card className="p-2">
        <CardDescription className="font-bold">
          {subscription?.credits} credits
        </CardDescription>
      </Card>
    </div>
  );
};

export default CreateCampaign;
