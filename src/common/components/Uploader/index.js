"use client";
import { FileUploaderInline } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useTheme } from "next-themes";

function Uploader({ value = [], onChange = () => {}, ...rest }) {
  const { theme } = useTheme();

  const handleChangeEvent = (items) => {
    onChange([...items.allEntries.filter((item) => item.status === "success")]);
  };

  return (
    <FileUploaderInline
      sourceList="local"
      pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY}
      onChange={handleChangeEvent}
      classNameUploader={`uc-${theme || "light"}`}
      {...rest}
    />
  );
}

export default Uploader;
