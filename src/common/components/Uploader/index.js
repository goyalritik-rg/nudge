"use client";
import { FileUploaderInline } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useTheme } from "next-themes";
import { useEffect } from "react";

function Uploader({ value = [], onChange = () => {}, ...rest }) {
  const { theme } = useTheme();

  const handleChangeEvent = (items) => {
    onChange([...items.allEntries.filter((item) => item.status === "success")]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const sourceList = document.querySelector("uc-source-list");

      const copyright = document.querySelector("uc-copyright");

      if (sourceList) {
        sourceList.style.display = "none";
      }
      if (copyright) {
        copyright.style.display = "none";
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <FileUploaderInline
        sourceList="local"
        pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY}
        onChange={handleChangeEvent}
        classNameUploader={`uc-${theme || "light"}`}
        {...rest}
      />
    </div>
  );
}

export default Uploader;
