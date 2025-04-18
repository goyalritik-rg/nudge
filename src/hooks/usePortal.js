import { onBookNewAppointment, saveAnswers } from "@/actions/appointment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const usePortal = ({ customerId, domainId, email, questions }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      ...questions.reduce(
        (acc, q) => ({ ...acc, [`question-${q.id}`]: q.answered }),
        {}
      ),
    },
  });

  const [step, setStep] = useState(questions.length ? 1 : 2);

  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const { back } = useRouter();

  const onNext = () => setStep((prev) => prev + 1);

  const onPrev = () => setStep((prev) => prev - 1);

  const onBookAppointment = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const questions = Object.keys(values)
        .filter((key) => key.startsWith("question"))
        .reduce((obj, key) => {
          obj[key.split("question-")[1]] = values[key];
          return obj;
        }, {});

      const savedAnswers = await saveAnswers(questions, customerId);

      if (savedAnswers) {
        const booked = await onBookNewAppointment(
          domainId,
          customerId,
          selectedSlot,
          date,
          email
        );

        if (booked && booked.status == 200) {
          toast.success(booked.message);

          setStep(3);

          back();
        }

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const onSelectedTimeSlot = (slot) => setSelectedSlot(slot);

  return {
    step,
    onNext,
    onPrev,
    control,
    errors,
    loading,
    onBookAppointment,
    date,
    setDate,
    onSelectedTimeSlot,
    selectedSlot,
    setStep,
  };
};
export default usePortal;
