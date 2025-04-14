import Layout from "@/common/form/Layout";
import { Button } from "@/components/ui/button";

import controls from "@/config/sign-up";
import Link from "next/link";

const SecondStep = ({
  onNext = () => {},
  formProps = {},
  onGenerateOTP = () => {},
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = formProps;

  const handleNext = (values) => {
    onGenerateOTP({ ...values, onSuccess: onNext });
  };

  return (
    <div>
      <h2 className="text-gravel md:text-4xl font-bold">Account details</h2>
      <p className="text-iridium md:text-sm mt-2 mb-12">
        Enter your email and password
      </p>

      <Layout controls={controls} control={control} errors={errors} />

      <div id="clerk-captcha" className="hidden" />

      <div className="w-full flex flex-col gap-3 items-center mt-14">
        <Button
          type="submit"
          className="w-full"
          size="lg"
          onClick={handleSubmit(handleNext)}
        >
          Continue
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

export default SecondStep;
