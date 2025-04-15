import { getUser } from "@/actions/auth";
import Sidebar from "@/components/Dashboard/Sidebar";
import { ChatProvider } from "@/context/user-chat-context";

const OwnerLayout = async ({ children }) => {
  const userData = await getUser();

  if (!userData) {
    return null;
  }

  return (
    <ChatProvider>
      <div className="h-full w-full flex">
        <Sidebar domains={userData.domains} />

        {children}
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
