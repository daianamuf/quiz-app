import { useEffect } from "react";
import { createContext, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  selectedAnswer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer": {
      const isCorrect =
        state.questions[state.index].correct_answer === action.payload;
      return {
        ...state,
        selectedAnswer: action.payload,
        isAnswerCorrect: isCorrect,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        selectedAnswer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    default:
      throw new Error("Action unknown");
  }
}

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch("/test.json");
        const data = await res.json();
        const shuffledQuestions = shuffleArray(data.questions);
        dispatch({ type: "dataReceived", payload: shuffledQuestions });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.error("error:", err);
      }
    };

    getQuestions();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export default QuizContext;
