//React
import React, { createContext, useReducer } from "react";
import { NotificationManager } from "react-notifications";

//Services
import {
  getFunc,
  postFunc,
  deleteFunc,
  putFunc
} from "../services/mainApiServices";

import quizzesReducer from "../reducers/quizzesReducer";
import { quizzesMock, oldQuestionsMock } from "./mockData";

const initialState = {
  quizzes: {
    data: [],
    loading: false,
    error: ""
  },
  oldQuestions: {
    data: [],
    loading: false,
    error: ""
  },
  oneQuiz: {
    data: null,
    loading: false,
    error: ""
  }
};

export const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizzesReducer, initialState);

  const getAllQuizzes = async () => {
    dispatch({ type: "GET_QUIZZES_REQ" });

    const response = await getFunc(`quizzes`);

    if (/* response?.status === 200*/ quizzesMock?.status) {
      dispatch({
        type: "GET_QUIZZES_SCS",
        payload: { data: /* response?.data */ quizzesMock?.data }
      });
    } else {
      dispatch({ type: "GET_QUIZZES_FLR" });
      NotificationManager.error(quizzesMock.status.description.message);
    }
  };

  const getAllOldQuestions = async () => {
    dispatch({ type: "GET_ALL_OLD_QUESTIONS_REQ" });

    const response = await getFunc(`quizzes`);

    if (/* response?.status === 200*/ oldQuestionsMock?.status) {
      dispatch({
        type: "GET_ALL_OLD_QUESTIONS_SCS",
        payload: { data: /* response?.data */ oldQuestionsMock?.data }
      });
    } else {
      dispatch({ type: "GET_ALL_OLD_QUESTIONS_FLR" });
      NotificationManager.error(quizzesMock.status.description.message);
    }
  };

  const createQuiz = async (body, handleOpen) => {
    dispatch({ type: "CREATE_QUIZ_REQ" });

    const response = await postFunc(`quizzes`, body);
    const mockResponse = { status: 200 };
    if (/* response?.status === 200*/ mockResponse?.status) {
      NotificationManager.error("bravo");

      dispatch({
        type: "CREATE_QUIZ_SCS",
        payload: { data: /* response?.data */ body }
      });
      handleOpen();
    } else {
      dispatch({ type: "CREATE_QUIZ_FLR" });
      NotificationManager.error(quizzesMock.status.description.message);
    }
  };

  const getOneQuiz = async id => {
    if (state?.quizzes?.data?.length > 0) {
      dispatch({
        type: "GET_ONE_QUIZ_FROM_TABLE",
        payload: { id: id }
      });
    } else {
      dispatch({ type: "GET_ONE_QUIZ_REQ" });

      const response = await getFunc(`quizzes/${id}`);

      if (response?.status === 200) {
        dispatch({
          type: "GET_ONE_QUIZ_SCS",
          payload: { data: response?.data }
        });
      } else {
        dispatch({ type: "GET_ONE_QUIZ_FLR" });
        NotificationManager.error(quizzesMock.status.description.message);
      }
    }
  };

  const clearOneQuiz = () => {
    dispatch({ type: "CLEAR_ONE_QUIZ" });
  };

  const editQuiz = async (body, id, handleOpen) => {
    dispatch({ type: "EDIT_QUIZ_REQ" });

    const response = await putFunc(`quizzes/${id}`, body);
    const mockResponse = { status: 200 };
    if (/* response?.status === 200*/ mockResponse?.status) {
      NotificationManager.error("bravo");

      dispatch({
        type: "EDIT_QUIZ_SCS",
        payload: { data: /* response?.data */ body, id: id }
      });
      handleOpen();
    } else {
      dispatch({ type: "EDIT_QUIZ_FLR" });
      NotificationManager.error(quizzesMock.status.description.message);
    }
  };

  const deleteQuiz = async (id, handleOpen) => {
    dispatch({ type: "DELETE_QUIZ_REQ" });

    const response = await deleteFunc(`quizzes/${id}`);

    const mockResponse = { status: 200 };
    if (/* response?.status === 200*/ mockResponse?.status) {
      dispatch({
        type: "DELETE_QUIZ_SCS",
        payload: { data: /* response?.data?.id */ id }
      });
      handleOpen();
    } else {
      dispatch({ type: "DELETE_QUIZ_FLR" });
      NotificationManager.error(quizzesMock.status.description.message);
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        quizzes: state.quizzes,
        oldQuestions: state.oldQuestions,
        oneQuiz: state.oneQuiz,
        getAllQuizzes,
        createQuiz,
        getAllOldQuestions,
        getOneQuiz,
        clearOneQuiz,
        editQuiz,
        deleteQuiz
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
