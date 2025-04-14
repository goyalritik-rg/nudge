"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useTimer from "@/hooks/useTimer";
import { useEffect } from "react";

const OTPInput = ({
  value,
  onChange = () => {},
  maxLength = 6,
  resendOtpTimerDuration = 60,
  resendOtp = () => {},
}) => {
  const { start, seconds } = useTimer({
    durationInSeconds: resendOtpTimerDuration,
  });

  useEffect(() => {
    start();
  }, []);

  const handleResend = async () => {
    await resendOtp({ onSuccess: start });
  };

  return (
    <div className="flex flex-col gap-3">
      <InputOTP maxLength={maxLength} value={value} onChange={onChange}>
        <InputOTPGroup>
          {Array.from({ length: maxLength }).map((_, index) => {
            return <InputOTPSlot key={index} index={index} />;
          })}
        </InputOTPGroup>
      </InputOTP>

      <div>
        {Number(seconds) > 0 ? (
          <span className="text-sm">
            Resend OTP in {Number(seconds)} seconds
          </span>
        ) : (
          <Button className="p-0" variant="link" onClick={handleResend}>
            Resend OTP
          </Button>
        )}
      </div>
    </div>
  );
};

export default OTPInput;
