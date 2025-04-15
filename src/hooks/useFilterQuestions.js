import {
  onCreateFilterQuestions,
  onGetAllFilterQuestions,
} from "@/actions/settings";
import { FilterQuestionsSchema } from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useFilterQuestions = (id) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(FilterQuestionsSchema),
  });

  const [loading, setLoading] = useState(false);
  const [isQuestions, setIsQuestions] = useState([]);

  const onAddFilterQuestions = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const questions = await onCreateFilterQuestions(id, values.question);
      if (questions) {
        reset();

        setIsQuestions(questions.questions);

        toast.info(questions.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);

    const questions = await onGetAllFilterQuestions(id);

    if (questions) {
      setIsQuestions(questions.questions);
    }

    setLoading(false);
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    loading,
    onAddFilterQuestions,
    control,
    errors,
    isQuestions,
  };
};

export default useFilterQuestions;
