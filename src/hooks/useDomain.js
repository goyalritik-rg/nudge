import { onIntegrateDomain } from "@/actions/settings";
import { useDashboardContext } from "@/context/dashboard-context";
import { AddDomainSchema } from "@/schemas/settings.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDomain = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AddDomainSchema),
  });

  const pathname = usePathname();

  const { domains = [], refreshDashboard = () => {} } = useDashboardContext();

  const [loading, setLoading] = useState(false);
  const [isDomain, setIsDomain] = useState(undefined);

  useEffect(() => {
    setIsDomain(pathname.split("/").pop());
  }, [pathname]);

  const onAddDomain = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const domain = await onIntegrateDomain(
        values.domain,
        values?.image?.[0].uuid
      );

      if (domain) {
        reset();

        const { status, message } = domain || {};

        if (status === 200) {
          toast.success(message);
        } else {
          toast.error(message);
        }

        refreshDashboard();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return {
    control,
    onAddDomain,
    errors,
    loading,
    isDomain,
    domains,
  };
};
