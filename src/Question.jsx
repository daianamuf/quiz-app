import { useContext } from "react";
import Options from "./Options";
import QuizContext from "./QuizContext";

function Question() {
  const context = useContext(QuizContext);
  const { state } = context;
  const { questions, index } = state;
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
