import React from "react";
import Layout from "@/common/form/Layout";
import Button from "@/common/components/Button";

const QuestionsForm = ({ questions, control, errors, onNext }) => {
  return (
    <div className="flex flex-col gap-5 justify-center w-[400px]">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold mb-5">Details</h2>
      </div>

      <Layout
        control={control}
        errors={errors}
        controls={questions.map((q) => ({
          name: `question-${q.id}`,
          label: q.question,
          type: "text",
          placeholder: q.answered || "Not answered",
          value: q.answered || "",
        }))}
      />

      <Button className="w-full mt-10" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

export default QuestionsForm;
