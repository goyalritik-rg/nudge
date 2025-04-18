"use client";

import usePortal from "@/hooks/usePortal";
import { cn } from "@/lib/utils";
import ActiveForm from "./ActiveForm";

const Form = ({ email, questions, bookings, customerId, domainId }) => {
  const {
    step,
    onNext,
    onPrev,
    control,
    errors,
    date,
    setDate,
    onBookAppointment,
    onSelectedTimeSlot,
    selectedSlot,
    loading,
    setStep,
  } = usePortal({ customerId, domainId, email, questions });

  return (
    <div className="h-[calc(100dvh-125px)] flex flex-col gap-10 relative w-[90%] items-center">
      <ActiveForm
        loading={loading}
        slot={selectedSlot}
        bookings={bookings}
        onSlot={onSelectedTimeSlot}
        date={date}
        onBooking={setDate}
        step={step}
        questions={questions}
        errors={errors}
        control={control}
        onNext={onNext}
        onBack={onPrev}
        onBookAppointment={onBookAppointment}
      />

      {(step == 1 || step == 2) && questions.length ? (
        <div className="w-full flex justify-center absolute bottom-10 left-0 right-0">
          <div className="min-w-[400px] grid grid-cols-2 gap-3">
            <div
              onClick={() => setStep(1)}
              className={cn(
                "rounded-full h-2 col-span-1",
                step == 1 ? "bg-orange" : "bg-gray-200"
              )}
            />
            <div
              onClick={() => setStep(2)}
              className={cn(
                "rounded-full h-2 col-span-1",
                step == 2 ? "bg-orange" : "bg-gray-200"
              )}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Form;
