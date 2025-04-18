import { onSaveEmailTemplate } from "@/actions/e-mail";
import { EmailMarketingBodySchema } from "@/schemas/marketing.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useEditTemplate = ({ id, refetch = () => {} }) => {
  const [editing, setEditing] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(EmailMarketingBodySchema),
  });

  const onCreateEmailTemplate = handleSubmit(async (values) => {
    try {
      setEditing(true);

      const template = JSON.stringify(values.description);

      const emailTemplate = await onSaveEmailTemplate(template, id);

      if (emailTemplate) {
        toast.success(emailTemplate.message);
        refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditing(false);
    }
  });

  return {
    editing,
    onCreateEmailTemplate,
    control,
    errors,
    setValue,
  };
};

export default useEditTemplate;
