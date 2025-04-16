import { getUser } from "@/actions/auth";
import Sidebar from "@/components/Sidebar";
import { ChatProvider } from "@/context/user-chat-context";

const OwnerLayout = async ({ children }) => {
  const userData = await getUser();

  if (!userData) {
    return null;
  }

  return (
    <ChatProvider>
      <div className="h-full w-full relative flex">
        <div className="sticky h-[100dvh] top-0 p-4 pr-3">
          <Sidebar domains={userData.domains} />
        </div>

        {children}
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
