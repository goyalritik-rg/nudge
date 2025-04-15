"use client";

import Button from "@/common/components/Button";
import Image from "next/image";
import CodeSnippet from "./CodeSnippet";
import useDomainSettings from "@/hooks/useDomainSettings";
import Layout from "@/common/form/Layout";
import Section from "@/common/components/Section";
import { BotMessageSquare } from "lucide-react";
import LockContent from "@/common/components/LockContent";
import PremiumBadge from "@/common/components/PremiumBadge";

const SettingsForm = ({ id, name, chatBot, plan }) => {
  const {
    control,
    onUpdateSettings,
    errors,
    onDeleteDomain,
    deleting,
    loading,
  } = useDomainSettings({ id, name });

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-xl">Domain Settings</h2>

        <Layout
          control={control}
          errors={errors}
          controls={[
            {
              name: "domain",
              label: "Domain Name",
              type: "text",
              placeholder: name,
            },
          ]}
          className="max-w-[350px] pl-1"
        />

        <div className="mt-10 flex gap-10 items-start justify-between">
          <Section
            label="Code snippet"
            message="Copy and paste this code snippet into the header tag of your website"
          />

          <CodeSnippet id={id} />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <h2 className="font-semibold text-xl">Chatbot Settings</h2>

        <div className="grid md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-5 order-last md:order-first">
            <div className="flex flex-col gap-2 my-4">
              <Section
                label="Greeting message"
                message="Customize your welcome message"
              />

              <Layout
                control={control}
                errors={errors}
                controls={[
                  {
                    name: "welcomeMessage",
                    type: "textarea",
                    placeholder: chatBot?.welcomeMessage,
                    className: "h-50",
                  },
                ]}
                className="max-w-[450px] pl-1"
              />
            </div>

            <div className="py-5 flex flex-col items-start">
              <div className="flex gap-8 items-center">
                <Section
                  label="Chatbot icon"
                  message="Change the icon for the chatbot."
                />

                <PremiumBadge />
              </div>

              <LockContent>
                <Layout
                  control={control}
                  errors={errors}
                  controls={[
                    {
                      name: "image",
                      type: "upload",
                    },
                  ]}
                />
              </LockContent>

              <div className="flex flex-col items-center mt-5">
                <p className="text-muted-foreground font-medium text-sm mb-3">
                  ChatBot Visual Representation
                </p>

                {chatBot?.icon ? (
                  <div className="relative rounded-full overflow-hidden w-20 h-20 shadow-lg">
                    <Image
                      src={`https://ucarecdn.com/${chatBot.icon}/`}
                      alt="bot"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-full shadow-lg w-20 h-20 flex items-center justify-center bg-orange-100">
                    <BotMessageSquare className="size-8" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-1 flex justify-end">
            <Image
              src="/images/bot-ui.png"
              className="sticky top-0"
              alt="bot-ui"
              width={530}
              height={769}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-end">
        <Button
          onClick={onDeleteDomain}
          type="destructive"
          className="px-10 h-[50px]"
          loading={deleting}
        >
          Delete Domain
        </Button>

        <Button
          className="w-[100px] h-[50px]"
          onClick={onUpdateSettings}
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default SettingsForm;
