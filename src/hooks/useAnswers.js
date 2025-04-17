import { onGetAllCustomerResponses } from "@/actions/e-mail";
import { useEffect, useState } from "react";

export const useAnswers = (id) => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGetCustomerAnswers = async () => {
    try {
      setLoading(true);

      const answer = await onGetAllCustomerResponses(id);

      if (answer) {
        setAnswers(answer);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetCustomerAnswers();
  }, []);

  return { answers, loading };
};
