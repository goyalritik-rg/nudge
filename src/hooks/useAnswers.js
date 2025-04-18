import { onGetAllCustomerResponses } from "@/actions/e-mail";
import { useEffect, useState } from "react";

const useAnswers = ({ customerId }) => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGetCustomerAnswers = async () => {
    try {
      setLoading(true);

      const answer = await onGetAllCustomerResponses({ customerId });

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

export default useAnswers;
