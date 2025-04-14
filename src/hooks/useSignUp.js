"use client";

import { UserRegistrationSchema } from "@/schemas/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { onCompleteUserRegistration } from "@/actions/auth";

export const useSignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const { signUp, isLoaded, setActive } = useSignUp();

  const { push } = useRouter();

  const formProps = useForm({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "owner",
    },
    mode: "onChange",
  });

  const onGenerateOTP = async ({ email, password, onSuccess = () => {} }) => {
    if (!isLoaded) return;

    try {
      setLoading(true);

      await signUp.create({
        emailAddress: email,
        password: password,
        captchaContainerId: "clerk-captcha",
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      onSuccess();
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error(error.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async ({ onSuccess }) => {
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      onSuccess();
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error(error.errors[0].longMessage);
    }
  };

  const onHandleSubmit = async (values) => {
    if (!isLoaded) return;

    try {
      setLoading(true);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.otp,
      });

      if (completeSignUp.status !== "complete") {
        toast.error("Something went wrong! Please try again");
        return;
      }

      if (completeSignUp.status == "complete") {
        if (!signUp.createdUserId) return;

        const registered = await onCompleteUserRegistration(
          values.fullname,
          signUp.createdUserId,
          values.type
        );

        if (registered?.status == 200 && registered.user) {
          await setActive({
            session: completeSignUp.createdSessionId,
          });

          push("/dashboard");
        }

        if (registered?.status == 400) {
          toast.error("Something went wrong!");
        }
      }
    } catch (error) {
      toast.error(error.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formProps,
    onHandleSubmit,
    onGenerateOTP,
    loading,
    resendOtp,
  };
};
