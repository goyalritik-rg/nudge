import {
  onChatBotImageUpdate,
  onDeleteUserDomain,
  onUpdateDomain,
  onUpdateWelcomeMessage,
} from "@/actions/settings";
import { DomainSettingsSchema } from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useDomainSettings = (id) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(DomainSettingsSchema),
  });

  const { refresh, replace } = useRouter();

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onUpdateSettings = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const domain = await onUpdateDomain(id, values.domain);

      if (domain) {
        toast.success(domain.message);
      }

      if (values.image[0]) {
        // const uploaded = await upload.uploadFile(values.image[0]);

        const image = await onChatBotImageUpdate(id, values.image[0].uuid);

        if (image) {
          const { status, message } = image;

          if (status === 200) {
            toast.success(message);
          } else {
            toast.error(message);
          }
        }
      }

      if (values.welcomeMessage) {
        const message = await onUpdateWelcomeMessage(values.welcomeMessage, id);

        if (message) {
          toast.success(message.message);
        }
      }

      reset();

      if (domain?.updatedDomain) {
        replace(`/settings/${domain?.updatedDomain}`);
      } else {
        refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const onDeleteDomain = async () => {
    try {
      setDeleting(true);

      const deleted = await onDeleteUserDomain(id);

      if (deleted) {
        toast.success(deleted.message);

        replace(`/settings`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return {
    control,
    onUpdateSettings,
    errors,
    loading,
    onDeleteDomain,
    deleting,
  };
};

export default useDomainSettings;
