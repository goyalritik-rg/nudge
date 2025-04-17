import LoaderWrapper from "@/common/components/LoaderWrapper";
import { CardDescription } from "../ui/card";
import { useAnswers } from "@/hooks/useAnswers";

const Answers = ({ id }) => {
  const { answers, loading } = useAnswers(id);

  return (
    <div className="flex flex-col gap-5 p-4">
      <LoaderWrapper loading={loading}>
        {answers.length ? (
          answers.map((answer) =>
            answer.customer?.map(
              (customer) =>
                customer.questions?.length > 0 &&
                customer.questions.map((question, key) => (
                  <div key={key}>
                    <p>{question.question}</p>
                    <CardDescription>{question.answered}</CardDescription>
                  </div>
                ))
            )
          )
        ) : (
          <h3>No Answers Found</h3>
        )}
      </LoaderWrapper>
    </div>
  );
};

export default Answers;
