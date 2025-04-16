import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HelpDesk from "./HelpDesk";
import FilterQuestions from "./FilterQuestions";

const TABS = [
  {
    label: "Help Desk",
    value: "help_desk",
    component: HelpDesk,
  },
  {
    label: "Filter questions",
    value: "questions",
    component: FilterQuestions,
  },
];

const BotTraining = ({ id = "" }) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Bot Training</h2>

        <p className="text-sm font-light">
          Set FAQ questions, create questions for capturing lead information and
          train your bot to act the way you want it to.
        </p>
      </div>

      <Tabs defaultValue="help_desk" className="w-full mt-2">
        <TabsList>
          {TABS.map(({ label, value }) => {
            return (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {TABS.map(({ component: Component, value }) => {
          return (
            <TabsContent key={value} value={value}>
              <div className="mt-6 w-full">
                <Component id={id} />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default BotTraining;
