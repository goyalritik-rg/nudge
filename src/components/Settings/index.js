import Header from "../Header";
import Subscription from "../Subscription";
import BillingSettings from "./BillingSettings";
import PasswordChange from "./PasswordChange";
import Theme from "./Theme";

const Settings = () => {
  return (
    <div className="flex flex-col p-4 mb-10">
      <Header />

      <div className="w-full flex flex-col gap-15">
        <Subscription />
        <Theme />
        <PasswordChange />
      </div>
    </div>
  );
};

export default Settings;
