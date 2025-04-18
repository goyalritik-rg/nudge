import {
  onDomainCustomerResponses,
  onGetAllDomainBookings,
} from "@/actions/appointment";
import Form from "./Form";

const Appointment = async ({ params = {} }) => {
  const { customerId, domainId } = params || {};

  const { email, questions } = await onDomainCustomerResponses(customerId);
  const bookings = await onGetAllDomainBookings(domainId);

  if (!email) {
    return null;
  }

  return (
    <Form
      bookings={bookings}
      email={email}
      questions={questions}
      domainId={domainId}
      customerId={customerId}
    />
  );
};

export default Appointment;
