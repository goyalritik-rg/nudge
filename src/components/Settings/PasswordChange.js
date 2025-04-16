"use client";

import Section from "@/common/components/Section";
import Layout from "@/common/form/Layout";
import Button from "@/common/components/Button";
import useChangePassword from "@/hooks/useChangePassword";

const controls = [
  {
    name: "password",
    placeholder: "New password",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm password",
    type: "password",
  },
];

const PasswordChange = () => {
  const { control, errors, onChangePassword, loading } = useChangePassword();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <Section
        label="Change Password"
        message="Reset your password"
        className="lg:col-span-1"
      />

      <div className="lg:col-span-4 lg:w-[400px] flex flex-col gap-3">
        <Layout control={control} errors={errors} controls={controls} />

        <Button
          onClick={onChangePassword}
          loading={loading}
          className="max-w-[200px] mt-4"
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default PasswordChange;
