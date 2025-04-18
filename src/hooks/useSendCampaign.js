import { onBulkMailer } from "@/actions/e-mail";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const useSendCampaign = ({ emails = [], campaignId = "" }) => {
  const [loading, setLoading] = useState(false);

  const { refresh } = useRouter();

  const sendEmails = async () => {
    try {
      setLoading(true);

      const mails = await onBulkMailer(emails, campaignId);

      if (mails) {
        toast.success(mails.message);

        refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendEmails };
};
export default useSendCampaign;
