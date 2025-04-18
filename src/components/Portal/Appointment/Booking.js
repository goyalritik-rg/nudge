import Button from "@/common/components/Button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  {
    slot: "3:30pm",
  },
  {
    slot: "4:00pm",
  },
  {
    slot: "4:30pm",
  },
  {
    slot: "5:00pm",
  },
  {
    slot: "5:30pm",
  },
  {
    slot: "6:00pm",
  },
];

const BookAppointmentDate = ({
  date,
  onBooking,
  onBack,
  onSlot,
  currentSlot,
  loading,
  bookings,
  onBookAppointment,
}) => {
  return (
    <div className="flex flex-col gap-5 justify-center w-[60%]">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold mb-5">Book a meeting</h2>
      </div>

      <div className="flex gap-10 flex-col justify-between items-center text-center">
        <div className="w-full">
          <h6>Discovery Call</h6>
          <CardDescription>
            During this call, we aim to explore potential avenues for
            partnership, promotional opportunities, or any other means through
            which we can contribute to the success of your company.
          </CardDescription>
        </div>

        <div className="flex gap-3 items-start w-full justify-between">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onBooking}
            className="rounded-md border"
            disabled={{ before: new Date() }}
          />

          <div className="flex flex-wrap gap-5 max-w-[50%]">
            {TIME_SLOTS.map((slot, key) => {
              const isSelected = currentSlot == slot.slot;

              const isDisabled =
                bookings &&
                bookings.some(
                  (booking) =>
                    `${booking.date.getDate()}/${booking.date.getMonth()}` ===
                      `${date?.getDate()}/${date?.getMonth()}` &&
                    booking.slot == slot.slot
                );

              return (
                <Label htmlFor={`slot-${key}`} key={key}>
                  <Card
                    onClick={() => {
                      if (isDisabled) {
                        return;
                      }
                      onSlot(slot.slot);
                    }}
                    className={cn(
                      isSelected
                        ? "bg-orange-400 hover:!bg-orange-400"
                        : "bg-orange-50",
                      "px-10 py-4",
                      isDisabled
                        ? "bg-neutral-200 cursor-not-allowed border-neutral-800"
                        : "cursor-pointer border-orange hover:bg-orange-200 transition duration-150 ease-in-out"
                    )}
                  >
                    {slot.slot}
                  </Card>
                </Label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-center mt-5">
        <Button onClick={onBack} type="outline">
          Edit Questions?
        </Button>

        <Button type="primary" loading={loading} onClick={onBookAppointment}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookAppointmentDate;
