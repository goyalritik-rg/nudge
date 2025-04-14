import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="mt-28 w-[90%] md:w-[440px]">{children}</div>
    </div>
  );
};

export default Layout;
