"use client";

import OTPInput from "@/common/components/OTPInput";
import { Controller } from "react-hook-form";

function OTPController(props) {
  const { name, control, value, rules, ...rest } = props;

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      defaultValue={value}
      rules={rules}
      render={({ field: { onChange, onBlur, value: newValue, ref } }) => (
        <OTPInput
          ref={ref}
          {...rest}
          id={name}
          key={name}
          onChange={onChange}
          value={newValue ?? ""}
          onBlur={onBlur}
        />
      )}
    />
  );
}
export default OTPController;
