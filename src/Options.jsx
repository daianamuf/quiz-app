import { useContext } from "react";
import QuizContext from "./QuizContext";

function Options() {
  const { state, dispatch } = useContext(QuizContext);
  const { questions, index, selectedAnswer } = state;
  const currentQuestion = questions[index];
  const { answers, correct_answer } = currentQuestion;

  const handleSelectAnswer = (option) => {
    dispatch({ type: "newAnswer", payload: option });
  };

  return (
    <div className="options">
      {answers.map((option, optionIndex) => (
        <button
          key={optionIndex}
          className={`btn btn-option ${
            selectedAnswer === option ? "selected" : ""
          } ${
            selectedAnswer
              ? option === correct_answer
                ? "correct"
                : selectedAnswer === option
                ? "wrong"
                : ""
              : ""
          }`}
          disabled={selectedAnswer !== null}
          onClick={() => handleSelectAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
