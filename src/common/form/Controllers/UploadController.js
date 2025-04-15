"use client";

import Uploader from "@/common/components/Uploader";
import { Controller } from "react-hook-form";

function UploadController(props) {
  const { name, control, value, rules, ...rest } = props;

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      defaultValue={value}
      rules={rules}
      render={({ field: { onChange, onBlur, value: newValue } }) => (
        <Uploader
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
export default UploadController;
