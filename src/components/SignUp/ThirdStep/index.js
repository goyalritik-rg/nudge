import Button from "@/common/components/Button";
import Layout from "@/common/form/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";

const ThirdStep = ({
  onHandleSubmit = () => {},
  resendOtp = () => {},
  formProps = {},
  loading = false,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { ...formProps?.getValues() },
  });

  return (
    <div>
      <h2 className="text-gravel md:text-4xl font-bold">Enter OTP</h2>

      <p className="text-iridium md:text-sm mt-2 mb-6">
        Enter the one time password that was sent to your email.
      </p>

      <div className="justify-center flex mb-12 items-center">
        <Layout
          control={control}
          errors={errors}
          controls={[
            {
              name: "otp",
              type: "otp",
              resendOtp,
              rules: {
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "You must enter a 6 digit code",
                },
              },
            },
          ]}
        />
      </div>

      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          loading={loading}
          onClick={handleSubmit(onHandleSubmit)}
          className="w-full"
          size="lg"
        >
          Create an account
        </Button>

        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ThirdStep;
