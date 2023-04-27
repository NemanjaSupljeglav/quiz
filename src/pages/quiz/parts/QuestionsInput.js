import React, { useState } from "react";
import { Grid } from "@mui/material";

import { AddCircle, Close, Restore } from "@mui/icons-material";

//Atoms
import Input from "../../../components/atoms/Input";
import TooltipIconButton from "../../../components/atoms/TooltipIconButton";
import Select from "../../../components/atoms/Select";

//Mock data
import { oldQuestionsMock } from "../../../context/mockData";
const QuestionForm = props => {
  const { questions, setQuestions } = props;

  const [selectedType, setSelectedType] = useState("");
  const [oldQuestionsList, setoldQuestionsList] = useState(
    oldQuestionsMock?.data
  );
  const [error, setError] = useState({});

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (event, index) => {
    event.preventDefault();
    const newQuestions = [...questions];
    newQuestions[index].answer = event;
    setQuestions(newQuestions);
    console.log(questions);
  };

  const handleAddQuestion = type => {
    if (type === "add") {
      setQuestions([...questions, { question: "", answer: "" }]);
    } else {
      setQuestions([...questions, { question: "", answer: "", id: "" }]);
    }
  };

  const handleDeleteQuestion = index => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleOldQuestion = (event, data, index) => {
    event.preventDefault();
    const newQuestions = [...questions];
    newQuestions.splice(index, 1, data);
    setQuestions(newQuestions);
    console.log(questions, index, "handleOldQuestion");
  };
  const handleSubmit = event => {
    event.preventDefault();

    // Check for required fields
    const newError = {};
    let hasError = false;
    questions.forEach((question, index) => {
      if (!question.question) {
        newError[index] = { question: true };
        hasError = true;
      } else {
        newError[index] = { question: false };
      }

      if (!question.answer) {
        newError[index].answer = true;
        hasError = true;
      } else {
        newError[index].answer = false;
      }
    });
    setError(newError);

    if (!selectedType) {
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Handle form submission here
    console.log(questions);
  };

  return (
    <Grid container spacing={0}>
      {questions.map((question, index) => (
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
                  list={oldQuestionsList}
                  onChange={(event, value) =>
                    handleOldQuestion(event, value, index)
                  }
                />
              </Grid>
              <Grid width={50} height={50} style={{ marginTop: "5px" }}>
                <TooltipIconButton
                  tooltipTxt="Delete"
                  handleClick={() => handleDeleteQuestion(index)}
                  icon={<Close />}
                  color="disabled"
                />
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
                  value={questions[index].question}
                  error={error[index] && error[index].question}
                  onChange={event => handleQuestionChange(event, index)}
                />
              </Grid>
              <Grid item style={{ marginLeft: "10px" }}>
                <Input
                  label="Answer"
                  margin="normal"
                  fullWidth
                  value={questions[index].answer}
                  error={error[index] && error[index].answer}
                  onChange={event => handleAnswerChange(event, index)}
                />
              </Grid>
              <Grid
                width={50}
                height={50}
                item
                style={{ marginTop: "5px", marginRight: "5px" }}
              >
                <TooltipIconButton
                  tooltipTxt="Delete"
                  handleClick={() => handleDeleteQuestion(index)}
                  icon={<Close />}
                  color="disabled"
                />
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
      {/*     {questions.length < 25 && (
        <IconButton onClick={handleAddQuestion}>
          <AddCircle />
        </IconButton>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => console.log("Nemanja", questions)}
      >
        Submit
      </Button> */}
    </Grid>
  );
};

export default QuestionForm;
