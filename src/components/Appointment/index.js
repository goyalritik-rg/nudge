import { currentUser } from "@clerk/nextjs";
import Header from "../Header";
import { onGetAllBookingsForCurrentUser } from "@/actions/appointment";
import Section from "@/common/components/Section";
import { Card, CardContent } from "../ui/card";
import Separator from "@/common/components/Separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import AllAppointments from "./AllAppointments";

const today = new Date();

const Appointment = async () => {
  const user = await currentUser();

  if (!user) return null;

  const domainBookings = await onGetAllBookingsForCurrentUser(user.id);

  const { bookings = [] } = domainBookings || {};

  if (!bookings.length) {
    return (
      <div className="w-full flex justify-center">
        <p>No Appointments</p>
      </div>
    );
  }

  const bookingsForToday = bookings.filter(
    (booking) => booking.date.getDate() === today.getDate()
  );

  return (
    <div className="flex flex-col p-4 mb-10 w-full">
      <Header />

      <div className="flex flex-col-reverse items-start w-full justify-between lg:flex-row">
        <div className="w-full lg:w-[52%]">
          <Section
            label="Appointments Overview"
            message="Below is a list of all your scheduled bookings for today."
            className="mb-6"
          />

          <AllAppointments bookings={bookings} />
        </div>

        <Separator orientation="horizontal" className="my-10 flex lg:hidden" />

        <div className="w-full lg:w-[38%]">
          <Section
            label="Today's Appointments"
            message="Here is a list of all your scheduled bookings for today."
            className="mb-6"
          />

          {bookingsForToday.length ? (
            bookingsForToday.map((booking) => (
              <Card
                key={booking.id}
                className="rounded-xl overflow-hidden mt-4"
              >
                <CardContent className="p-0 flex">
                  <div className="w-4/12 text-xl bg-peach py-10 flex justify-center items-center font-bold border-r">
                    {booking.slot}
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between w-full p-3">
                      <p className="text-sm">
                        Created On
                        <br />
                        {booking.createdAt.getHours()}
                        {":"}
                        {booking.createdAt.getMinutes()}{" "}
                        {booking.createdAt.getHours() > 12 ? "PM" : "AM"}
                      </p>

                      <p className="text-sm">
                        Domain <br />
                        {booking.Customer?.Domain?.name}
                      </p>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="w-full flex items-center p-3 gap-2">
                      <Avatar>
                        <AvatarFallback>{booking.email[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">{booking.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <p>No Appointments For Today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
