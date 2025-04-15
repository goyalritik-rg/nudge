import Separator from "@/common/components/Separator";
import Header from "../Header";

const Conversation = () => {
  return (
    <div className="p-3 md:p-6 ml-4 mb-10 flex justify-between">
      <div>hello</div>

      <Separator orientation="vertical" className="mx-10" />

      <div className="flex flex-col">
        <Header />

        <div className="flex flex-col gap-15">Hello</div>
      </div>
    </div>
  );
};

export default Conversation;
