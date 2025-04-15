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
      <div className="flex h-screen w-full">
        <Sidebar domains={userData.domains} />

        <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
