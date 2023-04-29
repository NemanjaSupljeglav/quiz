import React from "react";
import { Grid } from "@mui/material";

import { AddCircle, Close, Restore } from "@mui/icons-material";

//Atoms
import Input from "../../../components/atoms/Input";
import TooltipIconButton from "../../../components/atoms/TooltipIconButton";
import Select from "../../../components/atoms/Select";

const DialogContent = props => {
  const {
    questions,
    setQuestions,
    validationWarning,
    setValidationWarning,
    quizTitle,
    setQuizTitle,
    handleGetAllOldQuestions,
    oldQuestions
  } = props;

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      answer: newQuestions[index]?.answer,
      question: event
    };
    setQuestions(newQuestions);
  };
  const handleOldQuestion = (event, data, index) => {
    event.preventDefault();
    const newQuestions = [...questions];
    newQuestions.splice(index, 1, data);
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      question: newQuestions[index]?.question,
      answer: event
    };
    setQuestions(newQuestions);
  };

  const handleAddQuestion = type => {
    type === "add"
      ? setQuestions([...questions, { question: "", answer: "" }])
      : setQuestions([...questions, { question: "", answer: "", id: "" }]);

    type === "select" && handleGetAllOldQuestions();
  };

  const handleDeleteQuestion = index => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    setValidationWarning(item => item - 1);
  };

  return (
    <Grid
      container
      item
      xs={12}
      sm={12}
      md={12}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Input
          label="Quzi title"
          value={quizTitle}
          onChange={setQuizTitle}
          validation={quizTitle === "" && validationWarning > 0}
        />
      </Grid>
      <Grid container spacing={0}>
        {questions?.map((question, index) => (
          <Grid
            key={index}
            style={{
              display: "flex"
            }}
            item
            className="boxBorder"
            xs={12}
            sm={12}
            md={6}
            lg={4}
          >
            {question?.id === "" ? (
              <>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ marginLeft: "5px" }}
                  item
                >
                  <Select
                    label={`Select an old question (${index + 1})`}
                    optionalLabel={option =>
                      `${option?.question} (${option?.answer})`
                    }
                    list={oldQuestions}
                    onChange={(event, value) =>
                      handleOldQuestion(event, value, index)
                    }
                    validation={validationWarning > index}
                  />
                </Grid>

                <Grid width={50} height={50} style={{ marginTop: "5px" }}>
                  {questions.length > 1 && (
                    <TooltipIconButton
                      tooltipTxt="Delete"
                      handleClick={() => handleDeleteQuestion(index)}
                      icon={<Close />}
                      color="disabled"
                    />
                  )}
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  item
                  style={{ marginLeft: "5px" }}
                >
                  <Input
                    label={`Question ${index + 1}`}
                    margin="normal"
                    fullWidth
                    value={question.question}
                    validation={
                      question.question === "" && validationWarning > index
                    }
                    onChange={event => handleQuestionChange(event, index)}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "10px" }}>
                  <Input
                    label="Answer"
                    margin="normal"
                    fullWidth
                    value={question?.answer}
                    validation={
                      question?.answer === "" && validationWarning > index
                    }
                    onChange={event => handleAnswerChange(event, index)}
                  />
                </Grid>

                <Grid
                  width={50}
                  height={50}
                  item
                  style={{ marginTop: "5px", marginRight: "5px" }}
                >
                  {questions.length > 1 && (
                    <TooltipIconButton
                      tooltipTxt="Delete"
                      handleClick={() => handleDeleteQuestion(index)}
                      icon={<Close />}
                      color="disabled"
                    />
                  )}
                </Grid>
              </>
            )}
          </Grid>
        ))}

        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid grey",
            height: "45px",
            position: "relative",
            top: "7px"
          }}
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
        >
          <TooltipIconButton
            tooltipTxt="Add new"
            handleClick={() => handleAddQuestion("add")}
            icon={<AddCircle />}
            width={50}
            height={50}
            color="disabled"
          />
          <TooltipIconButton
            tooltipTxt="Select an old"
            handleClick={() => handleAddQuestion("select")}
            icon={<Restore />}
            color="disabled"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DialogContent;
