import QuizApp from "./QuizApp";
import { QuizProvider } from "./QuizContext";

function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}

export default App;
