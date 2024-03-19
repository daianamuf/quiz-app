import { useContext } from "react";
import QuizContext from "./QuizContext";

function FinishScreen() {
  const context = useContext(QuizContext);
  const { dispatch } = context;
  const emoji = "🥇";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        Congrats! You answered all the questions!
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
