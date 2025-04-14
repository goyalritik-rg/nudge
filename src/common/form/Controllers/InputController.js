"use client";

import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

function InputController(props) {
  const { name, control, value, rules, ...rest } = props;

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      defaultValue={value}
      rules={rules}
      render={({ field: { onChange, onBlur, value: newValue } }) => (
        <Input
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
export default InputController;
