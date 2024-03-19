import { useContext } from "react";
import QuizContext from "./QuizContext";

function Progress() {
  const { state } = useContext(QuizContext);
  const { index, questions } = state;
  const numQuestions = questions.length;

  return (
    <header className="progress">
      <p>
        Question <strong>{index + 1}</strong> of {numQuestions}
      </p>
    </header>
  );
}

export default Progress;
