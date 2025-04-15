import { onIntegrateDomain } from "@/actions/settings";
import { AddDomainSchema } from "@/schemas/settings.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadClient } from "@uploadcare/upload-client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY,
});

export const useDomain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AddDomainSchema),
  });

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

      const uploaded = await upload.uploadFile(values.image[0]);

      const domain = await onIntegrateDomain(values.domain, uploaded.uuid);

      if (domain) {
        reset();
        setLoading(false);

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
    }
  });

  return {
    register,
    onAddDomain,
    errors,
    loading,
    isDomain,
  };
};
