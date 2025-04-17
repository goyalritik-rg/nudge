import LoaderWrapper from "@/common/components/LoaderWrapper";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { PhoneCall, User } from "lucide-react";
import { cn, getMonthName } from "@/lib/utils";
import Button from "@/common/components/Button";
import Modal from "@/common/components/Modal";
import { buttonVariants } from "../ui/button";
import EditTemplate from "./EditTemplate";

const ListCampaigns = ({
  campaign = [],
  campaignId = "",
  onSelectCampaign = () => {},
  processing = false,
  onCreateEmailTemplate = () => {},
  control = () => {},
  setValue = () => {},
  onBulkEmail = () => {},
  errors = {},
}) => {
  if (!campaign.length) {
    return <h3>No Campaigns Found</h3>;
  }

  return (
    <div className="flex flex-wrap gap-[1%] w-full">
      {campaign.length &&
        campaign.map((camp, i) => (
          <Card
            key={camp.id}
            className={cn(
              "p-5 w-[49%] cursor-pointer",
              campaignId == camp.id ? "bg-gray-100" : ""
            )}
            onClick={() => onSelectCampaign(camp.id)}
          >
            <LoaderWrapper loading={processing}>
              <CardContent className="p-0 flex flex-col items-center gap-3">
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <PhoneCall />

                    <CardDescription>
                      Created{" "}
                      {getMonthName(camp.createdAt.getMonth())?.short_label}{" "}
                      {camp.createdAt.getDate()}th
                    </CardDescription>
                  </div>

                  <div className="flex gap-2">
                    <User />

                    <CardDescription>
                      {camp.customers?.length || 0} customers added
                    </CardDescription>
                  </div>
                </div>

                <div className="flex w-full justify-between items-center">
                  <CardTitle className="text-xl">{camp.name}</CardTitle>

                  <Modal>
                    <Modal.Trigger>
                      <div className={buttonVariants({ variant: "outline" })}>
                        Edit Email
                      </div>
                    </Modal.Trigger>

                    <Modal.Content>
                      <Modal.Header
                        title="Edit Email"
                        description="This email will be sent to campaign members"
                      />

                      <Modal.Body className="mt-0 mb-6">
                        <EditTemplate
                          control={control}
                          errors={errors}
                          setDefault={setValue}
                          id={camp.id}
                          onCreateEmailTemplate={onCreateEmailTemplate}
                        />
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          variant="default"
                          className="rounded-lg"
                          onClick={() =>
                            onBulkEmail(
                              campaign[i].customers.map((c) => c),
                              camp.id
                            )
                          }
                        >
                          Send Campaign
                        </Button>
                      </Modal.Footer>
                    </Modal.Content>
                  </Modal>
                </div>
              </CardContent>
            </LoaderWrapper>
          </Card>
        ))}
    </div>
  );
};

export default ListCampaigns;
