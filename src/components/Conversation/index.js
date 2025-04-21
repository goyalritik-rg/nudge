import LeftMenu from "./LeftMenu";
import Messenger from "./Messenger";
import Header from "../Header";

const Conversation = async () => {
  return (
    <div className="p-x-4 py-6 mb-10 flex justify-between w-full">
      <LeftMenu />

      <div className="flex flex-col w-[53%] border-l-muted border-l ml-[2%]">
        <div className="px-5">
          <Header />
        </div>

        <Messenger />
      </div>
    </div>
  );
};

export default Conversation;
