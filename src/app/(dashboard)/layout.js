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
      <div className="h-full w-full">
        <Sidebar domains={userData.domains} />

        <div className="flex flex-col p-3 md:p-6 ml-[70px] mb-10">
          <Header />

          {children}
        </div>
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
