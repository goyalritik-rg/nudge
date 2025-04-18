import BookAppointmentDate from "./Booking";
import QuestionsForm from "./QuestionForm";

const ActiveForm = ({
  step,
  control,
  errors,
  onNext,
  questions,
  date,
  onBack,
  onBooking,
  bookings,
  slot,
  loading,
  onSlot,
  onBookAppointment,
}) => {
  if (step == 1) {
    return (
      <QuestionsForm
        control={control}
        errors={errors}
        onNext={onNext}
        questions={questions}
      />
    );
  }

  if (step == 2) {
    return (
      <BookAppointmentDate
        date={date}
        bookings={bookings}
        currentSlot={slot}
        control={control}
        onBack={onBack}
        onBooking={onBooking}
        onSlot={onSlot}
        loading={loading}
        onBookAppointment={onBookAppointment}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="font-bold text-gray-600 text-4xl">Thank You</h2>
      <p className="text-center">
        Thank you for taking the time to fill in this form. We look forward to
        speaking to you soon.
      </p>
    </div>
  );
};

export default ActiveForm;
