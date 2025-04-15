import BillingSettings from "./BillingSettings";
import PasswordChange from "./PasswordChange";
import Theme from "./Theme";

const Settings = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <BillingSettings />
      <Theme />
      <PasswordChange />
    </div>
  );
};

export default Settings;
