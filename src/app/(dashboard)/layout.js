import Sidebar from "@/components/Sidebar";
import DashboardProvider from "@/context/dashboard-context";

const OwnerLayout = async ({ children }) => {
  return (
    <DashboardProvider>
      <div className="h-full w-full relative flex">
        <div className="sticky h-[100dvh] top-0 p-4 pr-3">
          <Sidebar />
        </div>

        {children}
      </div>
    </DashboardProvider>
  );
};

export default OwnerLayout;
