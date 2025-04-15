import { ChangePasswordSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const updated = await onUpdatePassword(values.password);

      if (updated) {
        reset();
        toast.success(updated.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return {
    control,
    errors,
    onChangePassword,
    loading,
  };
};
export default useChangePassword;
