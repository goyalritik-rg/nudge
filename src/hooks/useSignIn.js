import { toast } from "sonner";
import { UserLoginSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();

  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const formProps = useForm({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = async (values) => {
    if (!isLoaded) return;

    try {
      setLoading(true);

      const authenticated = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (authenticated.status === "complete") {
        await setActive({ session: authenticated.createdSessionId });

        toast.success("Welcome back!");
        push("/dashboard");
      }
    } catch (error) {
      toast.error(error.errors[0].message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return {
    formProps,
    onHandleSubmit,
    loading,
  };
};
