import { useEffect } from "react";
import { createContext, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  selectedAnswer: null,
  selectedSubset: "All",
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start": {
      const selectedQuestions =
        state.selectedSubset === "All"
          ? Object.values(state.questions[0]).flat()
          : state.questions[0][state.selectedSubset.toLowerCase()];
      return {
        ...state,
        questions: shuffleArray(selectedQuestions),
        status: "active",
        index: 0,
        selectedAnswer: null,
      };
    }
    case "setSubset":
      return {
        ...state,
        selectedSubset: action.payload,
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
        const res = await fetch("/grile.json");
        const data = await res.json();
        const shuffledQuestions = shuffleArray(data.questions);
        dispatch({ type: "dataReceived", payload: shuffledQuestions });
        // const duplicateQuestions = findDuplicates(data.questions);
        // console.log("Duplicate Questions:", duplicateQuestions);
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.error("error:", err);
      }
    };

    getQuestions();
  }, []);

  function findDuplicates(questions) {
    const seen = new Map();
    const duplicates = [];

    questions.forEach((question, index) => {
      const questionString = JSON.stringify(question);
      if (seen.has(questionString)) {
        if (seen.get(questionString).count === 1) {
          duplicates.push({
            question: seen.get(questionString).question,
            position: seen.get(questionString).position,
          });
        }
        duplicates.push({ question, position: index });
        seen.get(questionString).count += 1;
      } else {
        seen.set(questionString, { question, position: index, count: 1 });
      }
    });

    return duplicates;
  }

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export default QuizContext;
