import Button from "@/common/components/Button";
import { RadioController } from "@/common/form/Controllers";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const FirstStep = ({ onNext = () => {}, formProps = {} }) => {
  const { control, watch } = formProps;

  const { type: watchType } = watch();

  function Label({ title = "", text = "", name = "" }) {
    const isActive = watchType === name;

    return (
      <div
        className={cn(
          "flex gap-4 items-center",
          isActive && "border-orange-500"
        )}
      >
        <div className={cn("shadow-sm p-3 border rounded-xl")}>
          <User size={30} className="text-gray-400" />
        </div>

        <div>
          <p className={cn(isActive && "font-semibold")}>{title}</p>
          <p className="text-gray-400 mt-2">{text}</p>
        </div>
      </div>
    );
  }

  const options = [
    {
      name: "owner",
      itemClassname: `text-foreground rounded-xl border p-5 py-8 shadow-sm w-full cursor-pointer flex gap-4 items-center ${
        watchType === "owner" && "border-orange-500"
      }`,
      label: (
        <Label
          title="I own a buisness"
          text="Setting up my account for my company."
          name="owner"
        />
      ),
    },
    {
      name: "student",
      itemClassname: `text-foreground rounded-xl border p-5 py-8 shadow-sm w-full cursor-pointer flex gap-4 items-center ${
        watchType === "student" && "border-orange-500"
      }`,
      label: (
        <Label
          title="Im a student"
          text="Looking to learn about the tool."
          name="student"
        />
      ),
    },
  ];

  const handleNext = () => {
    if (!watchType) {
      toast.info("Please select one to proceed further");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h2 className="text-gravel md:text-4xl font-bold">Create an account</h2>
      <p className="text-iridium md:text-sm mt-2 mb-12">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>

      <RadioController control={control} name="type" options={options} />

      <div className="w-full flex flex-col gap-3 items-center mt-14">
        <Button className="w-full" size="lg" onClick={handleNext}>
          Continue
        </Button>
        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FirstStep;
