import { cn, getMonthName } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import LoaderWrapper from "@/common/components/LoaderWrapper";
import { PhoneCall, Send, User } from "lucide-react";
import Modal from "@/common/components/Modal";
import { buttonVariants } from "../ui/button";
import EditTemplate from "./EditTemplate";
import Button from "@/common/components/Button";
import CustomerTable from "./CustomerTable";
import useSendCampaign from "@/hooks/useSendCampaign";
import { useState } from "react";

const CampaignCard = ({
  campaign = {},
  selectedCampaign,
  setSelectedCampaign = () => {},
  loading = false,
  getAllCampaigns = () => {},
  allCustomers = [],
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showSend, setShowSend] = useState(false);

  const { id, createdAt, customers = [], name, template } = campaign || {};

  const { loading: sendloading = false, sendEmails } = useSendCampaign({
    emails: customers,
    campaignId: id,
    onSuccess: () => setShowSend(false),
  });

  return (
    <Card
      className={cn(
        "p-5 w-full md:w-[49%] md:mb-4 cursor-pointer",
        selectedCampaign == id ? "bg-gray-100" : ""
      )}
      onClick={() => setSelectedCampaign(id)}
    >
      <LoaderWrapper loading={loading}>
        <CardContent className="p-0 flex flex-col items-center gap-3">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-2 items-center">
              <PhoneCall />

              <CardDescription>
                Created {getMonthName(createdAt.getMonth())?.short_label}{" "}
                {createdAt.getDate()}th
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <User />

              <CardDescription>
                {customers?.length || 0} customers added
              </CardDescription>
            </div>
          </div>

          <div className="flex w-full justify-between items-center">
            <CardTitle className="text-xl">{name}</CardTitle>

            <div className="flex items-center gap-3">
              <Modal show={showEdit} setShow={setShowEdit}>
                <Modal.Trigger>
                  <div
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    Edit Template
                  </div>
                </Modal.Trigger>

                <Modal.Content>
                  <Modal.Header
                    title="Edit Template"
                    description="This email will be sent to campaign members"
                  />

                  <Modal.Body className="mt-0 h-[240px]">
                    <EditTemplate
                      templateId={id}
                      template={template}
                      getAllCampaigns={getAllCampaigns}
                      setShowEdit={setShowEdit}
                    />
                  </Modal.Body>
                </Modal.Content>
              </Modal>

              <Modal
                className="!w-[700px]"
                show={showCustomers}
                setShow={setShowCustomers}
              >
                <Modal.Trigger>
                  <div
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    Add Customers
                  </div>
                </Modal.Trigger>

                <Modal.Content className="!w-[700px]">
                  <Modal.Header
                    title="Customers"
                    description="Please select the customers to whom this campaign will be sent"
                  />

                  <Modal.Body className="mt-0 h-[400px]">
                    <CustomerTable
                      allCustomers={allCustomers}
                      campaignId={id}
                      refetch={() => {
                        getAllCampaigns();
                        setShowCustomers(false);
                      }}
                      customers={customers}
                    />
                  </Modal.Body>
                </Modal.Content>
              </Modal>

              {customers.length ? (
                <Modal show={showSend} setShow={setShowSend}>
                  <Modal.Trigger>
                    <div
                      className={buttonVariants({
                        variant: "default",
                        size: "sm",
                      })}
                    >
                      Send Campaign
                    </div>
                  </Modal.Trigger>

                  <Modal.Content>
                    <Modal.Header
                      title="Send Template"
                      description="Campaign email will be sent to all the selected customers"
                    />

                    <Modal.Body className="mt-0">
                      <Button
                        variant="default"
                        className="rounded-lg w-full mt-10"
                        loading={sendloading}
                        onClick={sendEmails}
                      >
                        Send <Send />
                      </Button>
                    </Modal.Body>
                  </Modal.Content>
                </Modal>
              ) : null}
            </div>
          </div>
        </CardContent>
      </LoaderWrapper>
    </Card>
  );
};

export default CampaignCard;
