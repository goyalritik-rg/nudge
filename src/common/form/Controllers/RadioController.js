"use client";

import RadioGroup from "@/common/components/RadioGroup";
import { Controller } from "react-hook-form";

function RadioController(props) {
  const { name, control, value, rules, ...rest } = props;

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      defaultValue={value}
      rules={rules}
      render={({ field: { onChange, onBlur, value: newValue } }) => (
        <RadioGroup
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
export default RadioController;
