import Loader from "@/common/components/Loader";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className="size-12" />
    </div>
  );
};

export default LoadingScreen;
