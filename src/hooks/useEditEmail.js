import { onGetEmailTemplate } from "@/actions/e-mail";
import { useEffect, useState } from "react";

export const useEditEmail = (id) => {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState("");

  const onGetTemplate = async (id) => {
    try {
      setLoading(true);

      const email = await onGetEmailTemplate(id);
      if (email) {
        setTemplate(email);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetTemplate(id);
  }, []);

  return { loading, template };
};
