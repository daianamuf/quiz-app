import Loader from "./Loader";
import Error from "./Error";
import Quiz from "./Quiz";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import { useContext } from "react";
import QuizContext from "./QuizContext";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";

function QuizApp() {
  const context = useContext(QuizContext);
  const { state } = context;
  const { status } = state;

  return (
    <div className="app">
      <h1 className="app__heading">Vet Quiz</h1>
      <Quiz>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <NextButton />
          </>
        )}
      </Quiz>
      {status === "finished" && <FinishScreen />}
    </div>
  );
}

export default QuizApp;
