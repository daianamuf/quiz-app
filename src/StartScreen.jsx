import { Cat, Dog } from "@phosphor-icons/react";
import QuizContext from "./QuizContext";
import { useContext } from "react";

function StartScreen() {
  const context = useContext(QuizContext);
  const { state, dispatch } = context;
  const numQuestions = Object.values(state.questions[0]).flat().length;

  return (
    <div className="start">
      <h2 className="start__heading">
        <span>
          <Cat />
        </span>
        <span>Welcome to the Vet Quiz!</span>
        <span>
          <Dog />
        </span>
      </h2>
      <h3 className="start__heading--scnd">
        {numQuestions} questions to test your veterinary medicine mastery
      </h3>
      <div className="start__chooseSet">
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({ type: "setSubset", payload: "Fiziopatologie" })
          }
        >
          Fiziopatologie
        </button>
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({ type: "setSubset", payload: "Farmacologie" })
          }
        >
          Farmacologie
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "setSubset", payload: "Anatopat" })}
        >
          Anatomie patologica
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "setSubset", payload: "All" })}
        >
          All
        </button>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start!
      </button>
    </div>
  );
}

export default StartScreen;
