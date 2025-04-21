import Header from "../Header";
import Campaigns from "./Campaigns";

const EmailMarketing = () => {
  return (
    <div className="flex flex-col p-4 mb-10 w-full">
      <Header />

      <Campaigns />
    </div>
  );
};

export default EmailMarketing;
