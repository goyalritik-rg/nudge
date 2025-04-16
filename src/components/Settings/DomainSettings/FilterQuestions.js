"use client";

import Button from "@/common/components/Button";
import LoaderWrapper from "@/common/components/LoaderWrapper";
import Section from "@/common/components/Section";
import Layout from "@/common/form/Layout";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import useFilterQuestions from "@/hooks/useFilterQuestions";

const FilterQuestions = ({ id }) => {
  const { control, errors, onAddFilterQuestions, isQuestions, loading } =
    useFilterQuestions(id);

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="px-6 border-r-[1px] flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Section
            label="Question"
            message="Add a question that you want your chatbot to ask"
          />

          <Layout
            control={control}
            errors={errors}
            controls={[
              {
                name: "question",
                type: "text",
                placeholder: "Type your question",
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Section
            label="Answer to question (Optional)"
            message="The answer for the question above."
          />

          <Layout
            control={control}
            errors={errors}
            controls={[
              {
                name: "answer",
                type: "textarea",
                placeholder: "Type your answer",
                className: "h-44 [resize:none]",
              },
            ]}
          />
        </div>

        <Button
          loading={loading}
          type="primary"
          onClick={onAddFilterQuestions}
          size="lg"
        >
          Create BOT question
        </Button>
      </CardContent>

      <CardContent className="p-6 overflow-y-auto max-h-[420px]">
        <LoaderWrapper loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question, index) => (
              <p key={index} className="font-semibold">
                {question.question}
              </p>
            ))
          ) : (
            <CardDescription>No Questions to show</CardDescription>
          )}
        </LoaderWrapper>
      </CardContent>
    </Card>
  );
};

export default FilterQuestions;
