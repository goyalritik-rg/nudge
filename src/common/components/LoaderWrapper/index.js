import { cn } from "@/lib/utils";
import Loader from "../Loader";

const LoaderWrapper = ({ loading, children, className }) => {
  return loading ? (
    <div className={cn(className || "w-full py-5 flex justify-center")}>
      <Loader />
    </div>
  ) : (
    children
  );
};

export default LoaderWrapper;
