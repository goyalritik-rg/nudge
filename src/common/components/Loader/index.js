import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const Loader = ({ className = "" }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { rotate: 360 },
      { duration: 1, repeat: Infinity, ease: "linear" }
    );
  }, []);

  return <LoaderCircle ref={scope} className={cn("size-6", className)} />;
};

export default Loader;
