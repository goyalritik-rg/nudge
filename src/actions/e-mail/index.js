"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import nodemailer from "nodemailer";

export const onGetUserSubscription = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const userData = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
            credits: true, // include this if you want to show remaining credits
          },
        },
      },
    });

    return userData?.subscription;
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    return null;
  }
};

export const onGetAllCampaigns = async ({ domainId } = {}) => {
  if (!domainId) return null;

  try {
    const campaigns = await client.campaign.findMany({
      where: {
        domain: {
          some: {
            id: domainId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        customers: true,
        createdAt: true,
        template: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return campaigns;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const onGetDomainCustomers = async ({ domainId }) => {
  if (!domainId) return null;

  try {
    const customers = await client.customer.findMany({
      where: {
        domainId,
        email: {
          not: null,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    return customers;
  } catch (error) {
    console.error("Error fetching domain customers:", error);
    return null;
  }
};

export const onGetAllCustomerResponses = async ({ customerId }) => {
  try {
    const answers = await client.customerResponses.findMany({
      where: {
        customerId,
        answered: {
          not: null,
        },
      },
      select: {
        question: true,
        answered: true,
      },
    });

    return answers;
  } catch (error) {
    console.error("Error fetching customer responses:", error);
    return null;
  }
};
export const onCreateMarketingCampaign = async ({ name, domainId }) => {
  try {
    const user = await currentUser();

    if (!user || !domainId) return null;

    await client.campaign.create({
      data: {
        name,
        User: {
          connect: {
            clerkId: user.id,
          },
        },
        domain: {
          connect: {
            id: domainId,
          },
        },
      },
    });

    return {
      status: 200,
      message: "New campaign has been created and linked to the domain.",
    };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { status: 500, message: "Failed to create campaign." };
  }
};

export const onSaveEmailTemplate = async (template, campainId) => {
  try {
    const newTemplate = await client.campaign.update({
      where: {
        id: campainId,
      },
      data: {
        template,
      },
    });

    return { status: 200, message: "Email template updated" };
  } catch (error) {
    console.log(error);
  }
};

export const onAddCustomersToEmail = async (customers = [], id = "") => {
  try {
    const customerAdd = await client.campaign.update({
      where: {
        id,
      },
      data: {
        customers,
      },
    });

    if (customerAdd) {
      return { status: 200, message: "Customers added to campaign" };
    }
  } catch (error) {}
};

export const onBulkMailer = async (email = [], campaignId = "") => {
  try {
    const user = await currentUser();

    if (!user) return null;

    //get the template for this campaign
    const template = await client.campaign.findUnique({
      where: {
        id: campaignId,
      },
      select: {
        name: true,
        template: true,
      },
    });

    if (template && template.template) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODE_MAILER_EMAIL,
          pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        to: email,
        subject: template.name,
        text: JSON.parse(template.template),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      const creditsUsed = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          subscription: {
            update: {
              credits: { decrement: email.length },
            },
          },
        },
      });

      if (creditsUsed) {
        return { status: 200, message: "Campaign emails sent" };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
