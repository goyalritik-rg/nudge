import { onAddCustomersToEmail } from "@/actions/e-mail";
import { useState } from "react";
import { toast } from "sonner";

const useMapCustomers = ({ refetch, customers = [], campaignId }) => {
  const [loading, setLoading] = useState(false);

  const mapCustomers = async () => {
    try {
      setLoading(true);

      const customersAdded = await onAddCustomersToEmail(customers, campaignId);

      if (customersAdded) {
        toast.success(customersAdded.message);
        refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, mapCustomers };
};

export default useMapCustomers;
