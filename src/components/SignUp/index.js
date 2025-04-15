"use client";

import { useState } from "react";
import { useSignUpForm } from "@/hooks/useSignUp";
import Spinner from "@/common/components/Spinner";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const FirstStep = dynamic(() => import("./FirstStep"), {
  ssr: false,
  loading: Spinner,
});

const SecondStep = dynamic(() => import("./SecondStep"), {
  ssr: false,
  loading: Spinner,
});

const ThirdStep = dynamic(() => import("./ThirdStep"), {
  ssr: false,
  loading: Spinner,
});

const STEPS = {
  1: FirstStep,
  2: SecondStep,
  3: ThirdStep,
};

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const props = useSignUpForm();

  const ActiveStep = STEPS[currentStep];

  const allSteps = Object.keys(STEPS);

  const onNext = () => {
    setCurrentStep((p) => {
      if (p === allSteps.length) {
        return p;
      }
      return p + 1;
    });
  };

  const onBack = () => {
    setCurrentStep((p) => {
      if (p === 1) {
        return p;
      }
      return p - 1;
    });
  };

  return (
    <div className="">
      <ActiveStep onBack={onBack} onNext={onNext} {...props} />

      <div className={`flex gap-3 mt-12`}>
        {allSteps.map((step) => {
          const disabled = step > currentStep;

          return (
            <div
              role="presentation"
              onClick={() => {
                if (disabled) return;

                setCurrentStep(Number(step));
              }}
              key={step}
              style={{ cursor: disabled ? "not-allowed" : "pointer" }}
              className={cn(
                "rounded-full h-2 col-span-1 w-[33%] cursor-pointer",
                currentStep == step ? "bg-orange-500" : "bg-gray-400"
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SignUp;
