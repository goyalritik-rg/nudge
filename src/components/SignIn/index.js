"use client";

import Button from "@/common/components/Button";
import Layout from "@/common/form/Layout";
import controls from "@/config/sign-in";
import { useSignInForm } from "@/hooks/useSignIn";
import Link from "next/link";

const SignIn = () => {
  const { formProps, onHandleSubmit, loading } = useSignInForm();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = formProps;

  return (
    <div>
      <h2 className="text-gravel md:text-4xl font-bold mb-12">Sign In</h2>

      <Layout control={control} controls={controls} errors={errors} />

      <div className="w-full flex flex-col gap-3 items-center mt-14">
        <Button
          className="w-full"
          size="lg"
          onClick={handleSubmit(onHandleSubmit)}
          loading={loading}
        >
          Continue
        </Button>

        <p>
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
