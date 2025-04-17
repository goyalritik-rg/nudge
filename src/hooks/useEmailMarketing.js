"use client";

import {
  onAddCustomersToEmail,
  onBulkMailer,
  onCreateMarketingCampaign,
  onSaveEmailTemplate,
} from "@/actions/e-mail";
import {
  EmailMarketingBodySchema,
  EmailMarketingSchema,
} from "@/schemas/marketing.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useEmailMarketing = () => {
  const [isSelected, setIsSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [campaignId, setCampaignId] = useState();
  const [processing, setProcessing] = useState(false);
  const [isId, setIsId] = useState(undefined);
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(EmailMarketingSchema),
  });

  const {
    register: registerEmail,
    formState: { errors: emailErrors },
    handleSubmit: SubmitEmail,
    setValue,
  } = useForm({
    resolver: zodResolver(EmailMarketingBodySchema),
  });

  const { refresh } = useRouter();

  const onCreateCampaign = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const campaign = await onCreateMarketingCampaign(values.name);

      if (campaign) {
        reset();

        toast.success(campaign.message);

        refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const onCreateEmailTemplate = SubmitEmail(async (values) => {
    try {
      setEditing(true);

      const template = JSON.stringify(values.description);

      const emailTemplate = await onSaveEmailTemplate(template, campaignId);

      if (emailTemplate) {
        toast.success(emailTemplate.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditing(false);
    }
  });

  const onSelectCampaign = (id) => setCampaignId(id);

  const onAddCustomersToCampaign = async () => {
    try {
      setProcessing(true);

      const customersAdded = await onAddCustomersToEmail(
        isSelected,
        campaignId
      );

      if (customersAdded) {
        toast.success(customersAdded.message);

        setCampaignId("");
        refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const onSelectedEmails = (email) => {
    //add or remove
    const duplicate = isSelected?.find((e) => e == email);

    if (duplicate) {
      setIsSelected(isSelected?.filter((e) => e !== email));
    } else {
      setIsSelected((prev) => [...prev, email]);
    }
  };

  const onBulkEmail = async (emails = [], campaignId = "") => {
    try {
      const mails = await onBulkMailer(emails, campaignId);

      if (mails) {
        toast.success(mails.message);

        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSetAnswersId = (id) => setIsId(id);

  return {
    onSelectedEmails,
    isSelected,
    onCreateCampaign,
    register,
    errors,
    loading,
    onSelectCampaign,
    processing,
    campaignId,
    onAddCustomersToCampaign,
    onBulkEmail,
    onSetAnswersId,
    isId,
    registerEmail,
    emailErrors,
    onCreateEmailTemplate,
    editing,
    setValue,
    control,
  };
};

export default useEmailMarketing;
