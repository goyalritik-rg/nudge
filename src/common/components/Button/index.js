import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Loader from "../Loader";

const loaderClasses = {
  primary: "text-background",
  default: "text-background",
  secondary: "text-foreground",
};

const Button = ({
  type = "default",
  size = "default",
  className,
  loading = false,
  children = null,
  onClick,
  ...props
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={twMerge(
        "relative",
        buttonVariants({ variant: type, size }),
        className
      )}
      {...props}
      style={{ cursor: loading ? "progress" : "pointer" }}
      onClick={() => {
        if (loading || props.disabled) {
          return;
        }
        if (onClick && typeof onClick === "function") {
          onClick();
        }
      }}
    >
      <div
        className={twMerge(
          "flex items-center gap-1 justify-center",
          loading ? "invisible" : "visible"
        )}
      >
        {children}
      </div>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader className={twMerge("text-foreground", loaderClasses[type])} />
        </span>
      )}
    </motion.button>
  );
};

export default Button;
