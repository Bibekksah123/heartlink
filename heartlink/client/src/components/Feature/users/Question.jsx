import { useState } from "react";
import { datingQuestions } from "../../../data/datingQuestionns";
import "./QuestionAnswer.css";
import { useMutation } from "@tanstack/react-query";
import { Profile } from "../../../services/Api/user";
import toast from "react-hot-toast";

export default function DatingQuestions() {
  const [answers, setAnswers] = useState([]);

  const handleSelect = (question, selectedOption) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== question.id);

      return [
        ...filtered,
        {
          questionId: question.id,
          question: question.question,
          answer: selectedOption,
        },
      ];
    });
  };

  const { mutate:createProfileMutation } = useMutation( {
    mutationFn:Profile.createUserProfile,
    onSuccess: ( data ) => {
      console.log(data)
      toast.success(data?.message);
    },

    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Dating question answer failed");
    },
  });
  const answerQuestion = () => { createProfileMutation(answers) };



  return (
    <section className="dating-section">
      <div className="dating-container">
        <h1 className="dating-title">💞 Compatibility Questions</h1>

        {datingQuestions.map((q) => (
          <div key={q.id} className="question-box">
            <h2 className="question-text">
              {q.id}. {q.question}
            </h2>

            <div className="options-grid">
              {q.options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(q, opt)}
                  className={`option-btn ${
                    answers.find((a) => a.questionId === q.id)?.answer === opt
                      ? "option-selected"
                      : ""
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="submit-box">
          <button onClick={answerQuestion} className="submit-btn">
            Submit Answers
          </button>
        </div>
      </div>
    </section>
  );
}
