import Banner from "@/common/components/Banner";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col md:h-screen ">
      <div className="p-6 bg-orange-50">
        <Banner size="lg" />
      </div>

      <div className="flex justify-center items-center w-full mt-12">
        {children}
      </div>
    </div>
  );
};

export default Layout;
