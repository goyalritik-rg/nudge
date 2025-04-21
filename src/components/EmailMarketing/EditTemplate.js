import Button from "@/common/components/Button";
import Layout from "@/common/form/Layout";
import useEditTemplate from "@/hooks/useEditTemplate";
import { useEffect } from "react";

const EditTemplate = ({
  templateId: id,
  template = "",
  getAllCampaigns = () => {},
  setShowEdit = () => {},
}) => {
  const { editing, onCreateEmailTemplate, control, errors, setValue } =
    useEditTemplate({
      id,
      refetch: () => {
        getAllCampaigns();
        setShowEdit(false);
      },
    });

  useEffect(() => {
    setValue("description", template ? JSON.parse(template) : "");
  }, [template, setValue]);

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <Layout
        control={control}
        errors={errors}
        gap={0}
        className="w-full"
        controls={[
          {
            name: "description",
            type: "textarea",
            label: "Description",
            className: "h-30 [resize:none] w-full",
          },
        ]}
      />

      <Button
        variant="default"
        className="rounded-lg"
        loading={editing}
        onClick={onCreateEmailTemplate}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default EditTemplate;
