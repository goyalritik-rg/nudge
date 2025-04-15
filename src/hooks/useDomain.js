import { onIntegrateDomain } from "@/actions/settings";
import { AddDomainSchema } from "@/schemas/settings.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDomain = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(AddDomainSchema),
  });
  console.log(watch());

  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [isDomain, setIsDomain] = useState(undefined);

  const { refresh } = useRouter();

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

        refresh();
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
  };
};
