import React, { createContext, useReducer } from "react";
import { NotificationManager } from "react-notifications";

import {
  getFunc,
  postFunc,
  deleteFunc,
  putFunc
} from "../services/mainApiServices";
import songsReducer from "../reducers/songsReducer";
import { quizzesMock } from "./mockData";
const initialState = {
  quizzes: {
    data: [],
    loading: false,
    error: ""
  }
};

export const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(songsReducer, initialState);

  const getAllQuizzes = async () => {
    dispatch({ type: "GET_QUIZZES_REQ" });

    //const response = await getFunc(`quizzes`);

    if (/* response?.status === 200*/ true) {
      dispatch({
        type: "GET_QUIZZES_SCS",
        payload: { data: /* response?.data */ quizzesMock?.data }
      });
    } else {
      dispatch({ type: "GET_QUIZZES_FLR" });
      NotificationManager.error(quizzesMock.status.description.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        quizzes: state.quizzes,
        getAllQuizzes
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
