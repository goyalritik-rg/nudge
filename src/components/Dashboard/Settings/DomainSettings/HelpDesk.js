"use client";

import Button from "@/common/components/Button";
import LoaderWrapper from "@/common/components/LoaderWrapper";
import Section from "@/common/components/Section";
import Layout from "@/common/form/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import useHelpdesk from "@/hooks/useHelpdesk";

const HelpDesk = ({ id }) => {
  const { control, errors, onSubmitQuestion, isQuestions, loading } =
    useHelpdesk(id);

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="px-6 border-r-[1px] flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Section
            label="Question"
            message="Add a question that you believe is frequently asked."
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
            label="Answer to question"
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
          onClick={onSubmitQuestion}
          size="lg"
        >
          Create question
        </Button>
      </CardContent>

      <CardContent className="p-6 overflow-y-auto max-h-[420px]">
        <LoaderWrapper loading={loading}>
          {isQuestions.length ? (
            <Accordion type="single" collapsible className="w-full">
              {isQuestions.map((question, index) => (
                <AccordionItem
                  key={index}
                  value="item-1"
                  className="!border !border-neutral-950/15 px-4 rounded-lg mb-4"
                >
                  <AccordionTrigger>{question.question}</AccordionTrigger>
                  <AccordionContent>{question.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <CardDescription>No Questions to show</CardDescription>
          )}
        </LoaderWrapper>
      </CardContent>
    </Card>
  );
};

export default HelpDesk;
