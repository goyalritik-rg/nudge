import Separator from "@/common/components/Separator";
import { CardDescription, CardTitle } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const HelpDesk = ({ helpdesk = [], dimensions = {} }) => {
  const { height } = dimensions || {};

  return (
    <div
      className="overflow-y-auto overflow-x-hidden flex flex-col gap-4 -mx-4 px-4 pb-10 chat-window"
      style={{ height: Number(height) - 340 }}
    >
      <div>
        <CardTitle>Help Desk</CardTitle>

        <CardDescription>
          <p className="text-xs mt-1">
            Browse from a list of questions people usually ask.
          </p>
        </CardDescription>
      </div>

      <Separator orientation="horizontal" />

      {helpdesk?.length ? (
        <Accordion type="single" collapsible className="w-full">
          {helpdesk.map((desk, index) => (
            <AccordionItem
              key={index}
              value="item-1"
              className="!border !border-neutral-300 px-4 rounded-lg mb-4"
            >
              <AccordionTrigger>{desk.question}</AccordionTrigger>
              <AccordionContent>{desk.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <h3>No Questions Found</h3>
      )}
      {helpdesk?.length ? (
        <Accordion type="single" collapsible className="w-full">
          {helpdesk.map((desk, index) => (
            <AccordionItem
              key={index}
              value="item-1"
              className="!border !border-neutral-300 px-4 rounded-lg mb-4"
            >
              <AccordionTrigger>{desk.question}</AccordionTrigger>
              <AccordionContent>{desk.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <h3>No Questions Found</h3>
      )}
    </div>
  );
};

export default HelpDesk;
