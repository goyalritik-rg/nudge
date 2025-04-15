import {
  onCreateHelpDeskQuestion,
  onGetAllHelpDeskQuestions,
} from "@/actions/settings";
import { HelpDeskQuestionsSchema } from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useHelpdesk = (id) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(HelpDeskQuestionsSchema),
  });

  const [loading, setLoading] = useState(false);
  const [isQuestions, setIsQuestions] = useState([]);

  const onSubmitQuestion = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const question = await onCreateHelpDeskQuestion(
        id,
        values.question,
        values.answer
      );

      if (question) {
        setIsQuestions(question.questions);

        toast.info(question.message);

        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const onGetQuestions = async () => {
    try {
      setLoading(true);

      const questions = await onGetAllHelpDeskQuestions(id);

      if (questions) {
        setIsQuestions(questions.questions);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    control,
    onSubmitQuestion,
    errors,
    isQuestions,
    loading,
  };
};

export default useHelpdesk;
