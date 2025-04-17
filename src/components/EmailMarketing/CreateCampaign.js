import Button from "@/common/components/Button";
import { Plus } from "lucide-react";
import React from "react";
import { Card, CardDescription } from "../ui/card";
import Modal from "@/common/components/Modal";
import Layout from "@/common/form/Layout";
import { buttonVariants } from "../ui/button";

const CreateCampaign = ({
  control = () => {},
  errors = {},
  loading = false,
  subscription = {},
  onCreateCampaign = () => {},
}) => {
  return (
    <div className="flex gap-8 justify-end w-full items-center">
      <div className="font-bold">{subscription?.credits} credits left</div>

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
    </div>
  );
};

export default CreateCampaign;
