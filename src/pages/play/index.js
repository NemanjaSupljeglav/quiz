//React
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import TooltipIconButton from "../../components/atoms/TooltipIconButton";
import VisibilityIconIcon from "@mui/icons-material/Visibility";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

//Context
import { GlobalContext } from "../../context/globalState";

const useStyles = makeStyles(theme => ({
  container: {
    background: "#F5F5F5",
    backgroundPosition: "center",
    height: "100vh"
  },
  banner: {
    background: "#1976D2",
    padding: "10px",
    color: "white",
    height: "55px",
    display: "flex",
    justifyContent: " space-between",
    alignItems: "center",
    paddingLeft: "25px",
    paddingRight: "35px"
  },
  question: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    textAlign: "center",
    margin: "30px",
    marginBottom: "10px"
  },
  answer: {
    background: "#1976D2",
    color: "white",
    width: "max-content",
    padding: "10px 30px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "40px",
    marginTop: "20px"
  },
  button: {
    display: "flex",
    justifyContent: "center"
  }
}));

function Play() {
  const classes = useStyles();
  const context = useContext(GlobalContext);
  const { id } = useParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [readyForQuiz, setReadyForQuiz] = useState(false);

  useEffect(() => {
    context?.getOneQuiz(id);
    return () => {
      context?.clearOneQuiz();
    };
  }, [id]);

  const handleNextQuestion = () => {
    setQuestionIndex(prevQuestionIndex => prevQuestionIndex + 1);
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  const handleReadyForQuiz = () => {
    setReadyForQuiz(true);
  };

  const quizData = context?.oneQuiz?.data;
  const questionCount = quizData?.questions?.length;
  let currentQuestion = quizData?.questions?.[questionIndex];

  return (
    <Grid className={classes.container}>
      <Grid className={classes.banner}>
        <Typography variant="h6">{quizData?.title}</Typography>
        <Typography variant="h6">
          {readyForQuiz ? questionIndex + 1 : 0}/{questionCount}
        </Typography>
      </Grid>
      {readyForQuiz ? (
        <Typography variant="h6" className={classes.question}>
          {currentQuestion?.question}
        </Typography>
      ) : (
        <Typography variant="h6" className={classes.question}>
          Welcome to quiz! Are you ready ?
        </Typography>
      )}

      <Grid className={classes.button}>
        <TooltipIconButton
          tooltipTxt={
            !showAnswer && readyForQuiz
              ? "Check answer"
              : questionIndex < questionCount - 1 && showAnswer
              ? "Next question"
              : "Let's play"
          }
          handleClick={
            !showAnswer && readyForQuiz
              ? handleShowAnswer
              : questionIndex < questionCount - 1 && showAnswer
              ? handleNextQuestion
              : handleReadyForQuiz
          }
          icon={
            !showAnswer && readyForQuiz ? (
              <VisibilityIconIcon />
            ) : questionIndex < questionCount - 1 && showAnswer ? (
              <ArrowForwardIosIcon />
            ) : (
              <SentimentSatisfiedAltIcon />
            )
          }
          color="disabled"
        />
      </Grid>
      {showAnswer && (
        <Typography variant="h5" className={classes.answer}>
          {currentQuestion?.answer}
        </Typography>
      )}
    </Grid>
  );
}

export default Play;
