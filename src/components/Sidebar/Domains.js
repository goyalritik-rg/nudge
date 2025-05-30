import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDomain } from "@/hooks/useDomain";
import Modal from "@/common/components/Modal";
import Button from "@/common/components/Button";
import Layout from "@/common/form/Layout";
import { useState } from "react";

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

const Domains = ({ size }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    control,
    onAddDomain,
    loading,
    errors,
    isDomain,
    domains = [],
  } = useDomain();

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

        <Modal show={showModal} setShow={setShowModal}>
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
                onClick={async () => {
                  await onAddDomain();
                  setShowModal(false);
                }}
                loading={loading}
              >
                Add Domain
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>

      <div className="flex flex-col gap-1 text-ironside font-medium">
        {domains?.length
          ? domains.map((domain) => (
              <Link
                href={`/settings/${domain.id}`}
                key={domain.id}
                className={cn(
                  "transition flex gap-3 hover:bg-background hover:font-semibold hover:text-foreground dark:hover:bg-neutral-800 rounded-full duration-100 ease-in-out cursor-pointer ",
                  size === "max"
                    ? "py-2 px-3"
                    : "h-[50px] w-[50px] flex items-center justify-center",
                  domain.id == isDomain && "bg-white"
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
            ))
          : null}
      </div>
    </div>
  );
};

export default Domains;
