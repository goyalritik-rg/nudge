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
      <div className="h-[100%] w-full flex">
        <div className="p-4 h-[100dvh]">
          <Sidebar domains={userData.domains} />
        </div>

        {children}
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
