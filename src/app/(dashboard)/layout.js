import { getUser } from "@/actions/auth";
import Header from "@/components/Dashboard/Header";
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

        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col p-3 md:p-6 ml-4 mb-10">
            <Header />

            {children}
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
