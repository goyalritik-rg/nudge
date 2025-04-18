"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

// Get all customer responses (questions + answers) by customerId
export const onDomainCustomerResponses = async (customerId) => {
  if (!customerId) {
    return;
  }

  try {
    const customerQuestions = await client.customer.findUnique({
      where: { id: customerId },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    });

    if (customerQuestions) {
      return customerQuestions;
    }
  } catch (error) {
    console.error("Error fetching customer responses:", error);
    return null;
  }
};

// Get all bookings for a domain
export const onGetAllDomainBookings = async (domainId) => {
  try {
    return await client.bookings.findMany({
      where: { domainId },
      select: {
        slot: true,
        date: true,
      },
    });
  } catch (error) {
    console.error("Error fetching domain bookings:", error);
    return null;
  }
};

// Book a new appointment for a customer
export const onBookNewAppointment = async (
  domainId,
  customerId,
  slot,
  date,
  email
) => {
  try {
    await client.bookings.create({
      data: {
        domainId,
        customerId,
        slot,
        date,
        email,
      },
    });
    return { status: 200, message: "Appointment created" };
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

// Save/update answers for a customer's responses
export const saveAnswers = async (questions = [], customerId = "") => {
  try {
    const updates = Object.entries(questions).map(([id, answer]) =>
      client.customerResponses.update({
        where: { id },
        data: { answered: answer },
      })
    );
    await Promise.all(updates);
    return { status: 200, message: "Updated responses" };
  } catch (error) {
    console.error("Error saving responses:", error);
    return null;
  }
};

// Get all bookings linked to a user (by clerkId)
export const onGetAllBookingsForCurrentUser = async (clerkId) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId,
            },
          },
        },
      },
      select: {
        id: true,
        slot: true,
        createdAt: true,
        date: true,
        email: true,
        domainId: true,
        Customer: {
          select: {
            Domain: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return { bookings };
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return null;
  }
};

// Get booking count for the current user's domains
export const getUserAppointments = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    return await client.bookings.count({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId: user.id,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error getting appointment count:", error);
    return null;
  }
};
