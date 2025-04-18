"use client";

import {
  onCreateMarketingCampaign,
  onGetAllCampaigns,
  onGetDomainCustomers,
} from "@/actions/e-mail";
import { EmailMarketingSchema } from "@/schemas/marketing.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useCampaign = ({ domainId = "" }) => {
  const [loading, setLoading] = useState(false);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [customers, setCustomers] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(EmailMarketingSchema),
  });

  const getAllCampaigns = async () => {
    if (!domainId) {
      return;
    }

    try {
      setLoadingCampaigns(true);

      const allCampaigns = await onGetAllCampaigns({ domainId });

      if (allCampaigns) {
        setCampaigns(allCampaigns);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const getAllCustomers = async () => {
    if (!domainId) {
      return;
    }

    try {
      const allCustomers = await onGetDomainCustomers({ domainId });

      if (allCustomers) {
        setCustomers(allCustomers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateCampaign = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const campaign = await onCreateMarketingCampaign({
        name: values.name,
        domainId: domainId,
      });

      if (campaign) {
        reset();

        toast.success(campaign.message);

        getAllCampaigns();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    getAllCampaigns();
    getAllCustomers();
  }, [domainId]);

  return {
    errors,
    control,
    loading,
    onCreateCampaign,
    campaigns,
    loadingCampaigns,
    getAllCampaigns,
    customers,
  };
};
export default useCampaign;
