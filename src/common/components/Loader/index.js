import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const Loader = ({ className = "" }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { rotate: 360 },
      { duration: 1, repeat: Infinity, ease: "linear" }
    );
  }, []);

  return (
    <AiOutlineLoading3Quarters
      ref={scope}
      className={cn("size-6", className)}
    />
  );
};

export default Loader;
