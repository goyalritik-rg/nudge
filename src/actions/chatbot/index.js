"use server";

import { client } from "@/lib/prisma";
import { extractEmailsFromString, extractURLfromString } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs";
import OpenAI from "openai";
import { onMailer } from "../mailer";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const onStoreConversations = async (id, message, role) => {
  return client.chatRoom.update({
    where: { id },
    data: {
      message: {
        create: { message, role },
      },
    },
  });
};

export const getMessagesForChatRoom = async ({ chatRoomId }) => {
  return client.chatRoom.findUnique({
    where: { id: chatRoomId },
    select: {
      id: true,
      live: true,
      message: {
        select: { id: true, message: true, role: true, createdAt: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
};

export const createCustomer = async ({ domain_id, customer_id }) => {
  const chatBotDomain = await client.domain.findUnique({
    where: { id: domain_id },
    select: {
      name: true,
      filterQuestions: {
        where: { answered: null },
        select: { question: true },
      },
    },
  });

  if (!chatBotDomain) return { status: 400, message: "Something went wrong!" };

  await client.domain.update({
    where: { id: domain_id },
    data: {
      customer: {
        create: {
          id: customer_id,
          questions: { create: chatBotDomain.filterQuestions },
          chatRoom: { create: {} },
        },
      },
    },
  });

  const newCustomer = await client.customer.findUnique({
    where: { id: customer_id },
    select: {
      id: true,
      email: true,
      questions: true,
      chatRoom: {
        select: { id: true, live: true, mailed: true },
      },
    },
  });

  if (!newCustomer) return { status: 400, message: "Something went wrong!" };

  return {
    role: "assistant",
    content: `Welcome aboard! I'm glad to connect with you. Is there anything you need help with?`,
    chatRoomId: newCustomer.chatRoom[0]?.id,
  };
};

export const getChatRoom = async ({ customer_id }) => {
  try {
    const customerData = await client.customer.findUnique({
      where: { id: customer_id },
      select: {
        chatRoom: { select: { id: true, live: true, mailed: true } },
      },
    });
    return customerData?.chatRoom?.[0];
  } catch (error) {
    console.log(error);
  }
};

export const onGetCurrentChatBot = async (id) => {
  try {
    return client.domain.findUnique({
      where: { id },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async ({ domain_id, customer_id } = {}) => {
  try {
    const checkCustomer = await client.domain.findUnique({
      where: { id: domain_id },
      select: {
        User: { select: { clerkId: true } },
        customer: {
          where: { id: customer_id },
          select: {
            chatRoom: { select: { id: true, live: true, mailed: true } },
          },
        },
      },
    });

    const user = await clerkClient.users.getUser(checkCustomer.User.clerkId);
    await onMailer(user.emailAddresses[0].emailAddress);

    const mailed = await client.chatRoom.update({
      where: { id: checkCustomer.customer[0].chatRoom[0].id },
      data: { mailed: true },
    });

    if (mailed) {
      return {
        live: true,
        chatRoom: checkCustomer.customer[0].chatRoom[0].id,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getChatGPTMessage = async (
  domain_id = "",
  customer_id = "",
  chat = [],
  message = ""
) => {
  try {
    const extractedEmail = extractEmailsFromString(message);

    if (extractedEmail) {
      await client.customer.update({
        where: { id: customer_id },
        data: { email: extractedEmail[0] },
      });
    }

    const [customerData, chatBotDomain] = await Promise.all([
      client.customer.findUnique({
        where: { id: customer_id },
        select: {
          id: true,
          email: true,
          questions: true,
          chatRoom: { select: { id: true, live: true, mailed: true } },
        },
      }),
      client.domain.findUnique({
        where: { id: domain_id },
        select: {
          name: true,
          filterQuestions: {
            where: { answered: null },
            select: { question: true },
          },
        },
      }),
    ]);

    if (!customerData || !chatBotDomain) return null;

    const { chatRoom = [], email = "" } = customerData;

    const messages = [
      {
        role: "assistant",
        content: email
          ? `You will get an array of questions that you must ask the customer. 

            Progress the conversation using those questions. 

            Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 

            Do not forget it.

            only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

            Always maintain character and stay respectful.

            The array of questions : [${chatBotDomain.filterQuestions
              .map((q) => q.question)
              .join(", ")}]

            if the customer says something out of context or inappropriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

            if the customer agrees to book an appointment send them this link ${
              process.env.NEXT_PUBLIC_BASE_API_URL
            }/portal/${domain_id}/appointment/${customer_id}

            if the customer wants to buy a product redirect them to the payment page ${
              process.env.NEXT_PUBLIC_BASE_API_URL
            }/${domain_id}/payment/${customer_id}`
          : `You are a highly knowledgeable and experienced sales representative for ${chatBotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase.

            Right now, you're speaking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel comfortable and respected.

            Your primary goal is to naturally guide the conversation to collect the customer's **email address**.

            🔒 Under no circumstance should you provide **any link** (for booking, payment, or anything else) unless the customer has already provided a valid email address.

            Even if the user insists or repeatedly asks for a link, **do not provide it** until the email is collected.

            Stay in character, be polite, and redirect the conversation toward collecting the email if they try to skip ahead.`,
      },
      ...chat,
      { role: "user", content: message },
    ];

    const chatCompletion = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
      store: true,
    });

    const aiMessage = chatCompletion.choices[0]?.message?.content || "";

    if (email && aiMessage.includes("(realtime)")) {
      await client.chatRoom.update({
        where: { id: chatRoom[0].id },
        data: { live: true },
      });

      return {
        role: "assistant",
        content: aiMessage.replace("(realtime)", ""),
      };
    }

    if (email && chat.at(-1)?.content.includes("(complete)")) {
      const unanswered = await client.customerResponses.findFirst({
        where: { customerId: customer_id, answered: null },
        select: { id: true },
        orderBy: { question: "asc" },
      });

      if (unanswered) {
        await client.customerResponses.update({
          where: { id: unanswered.id },
          data: { answered: message },
        });
      }
    }

    if (email) {
      const generatedLink = extractURLfromString(aiMessage);

      if (generatedLink?.[0]) {
        return {
          role: "assistant",
          content: `Great! you can follow the link to proceed`,
          link: generatedLink[0],
        };
      }
    }

    return { role: "assistant", content: aiMessage };
  } catch (error) {
    console.log(error);
  }
};
