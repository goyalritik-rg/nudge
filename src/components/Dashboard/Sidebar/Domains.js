import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
// import { Loader } from "../loader";
// import FormGenerator from "../forms/form-generator";
// import UploadButton from "../upload-button";
import Link from "next/link";
import Image from "next/image";
import { useDomain } from "@/hooks/useDomain";
import Modal from "@/common/components/Modal";
import Button from "@/common/components/Button";
import Layout from "@/common/form/Layout";

const controls = [
  {
    name: "domain",
    label: "Domain",
    placeholder: "Example - websitename.com",
    type: "text",
  },
  {
    name: "image",
    label: "Upload Icon",
    type: "upload",
  },
];

const Domains = ({ domains, size }) => {
  const { control, onAddDomain, loading, errors, isDomain } = useDomain();

  return (
    <div
      className={cn("flex flex-col gap-3", size === "min" ? "mt-6" : "mt-3")}
    >
      <div
        className={cn(
          "flex justify-between w-full items-center",
          size === "min" && "flex-col gap-2"
        )}
      >
        <p className="text-xs text-gray-500 font-semibold">DOMAINS</p>

        <Modal>
          <Modal.Trigger>
            <div className="cursor-pointer text-gray-500 rounded-full border-2">
              <PlusCircle />
            </div>
          </Modal.Trigger>

          <Modal.Content>
            <Modal.Header
              title="Add your business domain"
              description="Add in your domain address to integrate your chatbot"
            />

            <Modal.Body className="mt-0 mb-15">
              <Layout control={control} errors={errors} controls={controls} />
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="w-full"
                onClick={onAddDomain}
                loading={loading}
              >
                Add Domain
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>

      <div className="flex flex-col gap-1 text-ironside font-medium">
        {domains?.length &&
          domains.map((domain) => (
            <Link
              href={`/settings/${domain.name.split(".")[0]}`}
              key={domain.id}
              className={cn(
                "flex gap-3 hover:bg-white rounded-full transition duration-100 ease-in-out cursor-pointer ",
                size === "max"
                  ? "py-2 px-3"
                  : "h-[50px] w-[50px] flex items-center justify-center",
                domain.name.split(".")[0] == isDomain && "bg-white"
              )}
            >
              <Image
                src={`https://ucarecdn.com/${domain.icon}/`}
                alt="logo"
                width={30}
                height={30}
              />

              {size === "max" && <p className="text-sm">{domain.name}</p>}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Domains;
