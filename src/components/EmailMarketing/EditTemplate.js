import Button from "@/common/components/Button";
import Layout from "@/common/form/Layout";
import { useEditEmail } from "@/hooks/useEditEmail";
import React, { useEffect } from "react";

const EditTemplate = ({
  id,
  errors,
  control,
  onCreateEmailTemplate = () => {},
  setDefault = () => {},
}) => {
  const { loading, template } = useEditEmail(id);

  useEffect(() => {
    if (!template) {
      return;
    }
    console.log("template", template);

    setDefault("description", JSON.parse(template));
  }, [template]);

  return (
    <div className="mt-4 border-b border-b-neutral-400 pb-10" key={loading}>
      <Layout
        control={control}
        errors={errors}
        gap={0}
        className="w-full"
        controls={[
          {
            name: "description",
            type: "textarea",
            label: "Description Template",
            className: "h-30 [resize:none] w-full",
          },
        ]}
      />

      <Button
        className="w-full mt-8"
        type="outline"
        onClick={onCreateEmailTemplate}
      >
        Save Template
      </Button>
    </div>
  );
};

export default EditTemplate;
