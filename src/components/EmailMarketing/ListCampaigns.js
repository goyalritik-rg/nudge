import LoaderWrapper from "@/common/components/LoaderWrapper";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { PhoneCall, User } from "lucide-react";
import { getMonthName } from "@/lib/utils";
import { Modal } from "@uploadcare/file-uploader";
import Button from "@/common/components/Button";

const ListCampaigns = ({
  campaign = [],
  campaignId = "",
  onSelectCampaign = () => {},
  processing = false,
}) => {
  if (!campaign.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-end mt-5 gap-3">
      {campaign.length &&
        campaign.map((camp, i) => (
          <Card
            key={camp.id}
            className={cn(
              "p-5 min-w-[600px] cursor-pointer",
              campaignId == camp.id ? "bg-gray-50" : ""
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
                      <Card className="rounded-lg cursor-pointer bg-grandis py-2 px-5 font-semibold text-sm hover:bg-orange text-gray-700">
                        Edit Email
                      </Card>
                    </Modal.Trigger>

                    <Modal.Content>
                      <Modal.Header
                        title="Edit Email"
                        description="This email will be sent to campaign members"
                      />

                      <Modal.Body className="mt-0 mb-15">
                        {/* <EditEmail
                        register={registerEmail}
                        errors={emailErrors}
                        setDefault={setValue}
                        id={camp.id}
                        onCreate={onCreateEmailTemplate}
                      /> */}
                        Body
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
                          Send
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
