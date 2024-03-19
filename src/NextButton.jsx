import { useContext } from "react";
import QuizContext from "./QuizContext";
import { PawPrint } from "@phosphor-icons/react";

function NextButton() {
  const { state, dispatch } = useContext(QuizContext);
  const { questions, index, selectedAnswer } = state;
  const numQuestions = questions.length;

  if (selectedAnswer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next <PawPrint className="btn__icon" />
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish <PawPrint className="btn__icon" />
      </button>
    );
  }
}

export default NextButton;
