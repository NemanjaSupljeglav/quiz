export default function quizzesReducer(state, action) {
  switch (action.type) {
    case "GET_QUIZZES_REQ":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data,
          loading: true,
          error: ""
        }
      };
    case "GET_QUIZZES_SCS":
      return {
        ...state,
        quizzes: {
          data: action?.payload?.data,
          loading: false
        }
      };
    case "GET_QUIZZES_FLR":
      return {
        ...state,
        quizzes: {
          data: [],
          loading: false,
          error: action?.payload?.error
        }
      };
    case "CREATE_QUIZ_REQ":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data,
          loading: true,
          error: ""
        }
      };
    case "CREATE_QUIZ_SCS":
      return {
        ...state,
        quizzes: {
          //data: [action?.payload?.data, ...state?.quizzes?.data],
          data: [
            { ...action?.payload?.data, id: Math.random() },
            ...state?.quizzes?.data
          ],
          loading: false
        },
        oldQuestions: {
          data: [],
          loading: false,
          error: ""
        }
      };
    case "CREATE_QUIZ_FLR":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data,
          loading: false,
          error: action?.payload?.error
        }
      };
    case "GET_ALL_OLD_QUESTIONS_REQ":
      return {
        ...state,
        oldQuestions: {
          data: state?.oldQuestions?.data,
          loading: true,
          error: ""
        }
      };
    case "GET_ALL_OLD_QUESTIONS_SCS":
      return {
        ...state,
        oldQuestions: {
          data: action?.payload?.data,
          loading: false
        }
      };
    case "GET_ALL_OLD_QUESTIONS_FLR":
      return {
        ...state,
        oldQuestions: {
          data: [],
          loading: false,
          error: action?.payload?.error
        }
      };
    case "GET_ONE_QUIZ_REQ":
      return {
        ...state,
        oneQuiz: {
          data: state?.oneQuiz?.data,
          loading: true,
          error: ""
        }
      };
    case "GET_ONE_QUIZ_SCS":
      return {
        ...state,
        oneQuiz: {
          data: action?.payload?.data,
          loading: false
        }
      };
    case "GET_ONE_QUIZ_FROM_TABLE":
      return {
        ...state,
        oneQuiz: {
          data: state?.quizzes?.data?.find(
            quiz => quiz.id == action?.payload?.id
          )
        }
      };
    case "GET_ONE_QUIZ_FLR":
      return {
        ...state,
        oneQuiz: {
          data: [],
          loading: false,
          error: action?.payload?.error
        }
      };
    case "CLEAR_ONE_QUIZ":
      return {
        ...state,
        oneQuiz: {
          data: null,
          loading: false,
          error: ""
        }
      };
    case "EDIT_QUIZ_REQ":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data,
          loading: true,
          error: ""
        }
      };
    case "EDIT_QUIZ_SCS":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data?.map(item => {
            if (item?.id === action.payload?.id) {
              return { ...action?.payload?.data, id: action.payload?.id };
            } else return item;
          }),
          loading: false
        },
        oldQuestions: {
          data: [],
          loading: false,
          error: ""
        }
      };
    case "EDIT_QUIZ_FLR":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data,
          loading: false,
          error: action?.payload?.error
        }
      };
    case "DELETE_QUIZ_REQ":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data,
          loading: true,
          error: ""
        }
      };
    case "DELETE_QUIZ_SCS":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data?.filter(
            item => item?.id !== action.payload?.data
          ),
          loading: false
        }
      };
    case "DELETE_QUIZ_FLR":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data,
          loading: false,
          error: action?.payload?.error
        }
      };
    default:
      return state;
  }
}
