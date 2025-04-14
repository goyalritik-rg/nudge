"use client";

import { Password } from "@/components/ui/password";
import { Controller } from "react-hook-form";

function PasswordController(props) {
  const { name, control, value, rules, ...rest } = props;

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      defaultValue={value}
      rules={rules}
      render={({ field: { onChange, onBlur, value: newValue } }) => (
        <Password
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
export default PasswordController;
