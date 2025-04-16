"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const onIntegrateDomain = async (domain, icon) => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  try {
    const subscription = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    const domainExists = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });

    if (domainExists) {
      return {
        status: 400,
        message: "Domain already exists",
      };
    }

    if (
      (subscription?.subscription?.plan == "STANDARD" &&
        subscription._count.domains < 1) ||
      (subscription?.subscription?.plan == "PRO" &&
        subscription._count.domains < 5) ||
      (subscription?.subscription?.plan == "ULTIMATE" &&
        subscription._count.domains < 10)
    ) {
      const newDomain = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          domains: {
            create: {
              name: domain,
              icon,
              chatBot: {
                create: {
                  welcomeMessage: "Hey there, have a question? Text us here",
                },
              },
            },
          },
        },
      });

      if (newDomain) {
        return { status: 200, message: "Domain successfully added" };
      }
    }
    return {
      status: 400,
      message:
        "You've reached the maximum number of domains, upgrade your plan",
    };
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserDomains = async () => {
  const user = await currentUser();

  if (!user) return;

  try {
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ...domains };
  } catch (error) {
    toast.error(error);
  }
};

export const getCurrentSubscriptionPlan = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return;
    }

    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDomainDetails = async (domainId) => {
  const user = await currentUser();

  if (!user) return;

  try {
    const userDomain = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            id: domainId,
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            products: true,
            chatBot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true,
              },
            },
          },
        },
      },
    });
    if (userDomain) {
      return userDomain;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateDomain = async (id, name) => {
  try {
    const domainExists = await client.domain.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
    });

    if (!domainExists) {
      const domain = await client.domain.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      if (domain) {
        return {
          status: 200,
          message: "Domain name updated",
        };
      }

      return {
        status: 400,
        message: "Oops something went wrong!",
      };
    }

    return {
      status: 400,
      message: "Domain with this name already exists",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onChatBotImageUpdate = async (id, icon) => {
  const user = await currentUser();

  if (!user) return;

  try {
    const domain = await client.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            data: {
              icon,
            },
          },
        },
      },
    });

    if (domain) {
      return {
        status: 200,
        message: "ChatBot image updated successfully",
      };
    }

    return {
      status: 400,
      message: "Oops something went wrong!",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateWelcomeMessage = async (message, domainId) => {
  try {
    const update = await client.domain.update({
      where: {
        id: domainId,
      },
      data: {
        chatBot: {
          update: {
            data: {
              welcomeMessage: message,
            },
          },
        },
      },
    });

    if (update) {
      return { status: 200, message: "Welcome message updated" };
    }
  } catch (error) {
    console.log(error);
  }
};
export const onDeleteUserDomain = async (id) => {
  const user = await currentUser();

  if (!user) return;

  try {
    //first verify that domain belongs to user
    const validUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (validUser) {
      //check that domain belongs to this user and delete
      const deletedDomain = await client.domain.delete({
        where: {
          userId: validUser.id,
          id,
        },
        select: {
          name: true,
        },
      });

      if (deletedDomain) {
        return {
          status: 200,
          message: `${deletedDomain.name} was deleted successfully`,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const onCreateHelpDeskQuestion = async (id, question, answer) => {
  try {
    const helpDeskQuestion = await client.domain.update({
      where: {
        id,
      },
      data: {
        helpdesk: {
          create: {
            question,
            answer,
          },
        },
      },
      include: {
        helpdesk: {
          select: {
            id: true,
            question: true,
            answer: true,
          },
        },
      },
    });

    if (helpDeskQuestion) {
      return {
        status: 200,
        message: "New help desk question added",
        questions: helpDeskQuestion.helpdesk,
      };
    }

    return {
      status: 400,
      message: "Oops! something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllHelpDeskQuestions = async (id) => {
  try {
    const questions = await client.helpDesk.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        answer: true,
        id: true,
      },
    });

    return {
      status: 200,
      message: "New help desk question added",
      questions: questions,
    };
  } catch (error) {
    console.log(error);
  }
};

export const onCreateFilterQuestions = async (id, question) => {
  try {
    const filterQuestion = await client.domain.update({
      where: {
        id,
      },
      data: {
        filterQuestions: {
          create: {
            question,
          },
        },
      },
      include: {
        filterQuestions: {
          select: {
            id: true,
            question: true,
          },
        },
      },
    });

    if (filterQuestion) {
      return {
        status: 200,
        message: "Filter question added",
        questions: filterQuestion.filterQuestions,
      };
    }
    return {
      status: 400,
      message: "Oops! something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllFilterQuestions = async (id) => {
  try {
    const questions = await client.filterQuestions.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        id: true,
      },
      orderBy: {
        question: "asc",
      },
    });

    return {
      status: 200,
      message: "",
      questions: questions,
    };
  } catch (error) {
    console.log(error);
  }
};
