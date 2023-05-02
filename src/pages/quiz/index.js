// React
import React, { useState, useEffect, useContext } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";

// MUI
import Grid from "@mui/material/Grid";
import TooltipIconButton from "../../components/atoms/TooltipIconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@material-ui/core/styles";

//Parts
import DialogContent from "./parts/DialogContent";

//Molecules
import FullScreenDialog from "../../components/molecules/FullScreenDialog";
import WarningDialog from "../../components/molecules/WarningDialog";

//Context
import { GlobalContext } from "../../context/globalState";

const useStyles = makeStyles(theme => ({
  extendRow: {
    marginLeft: "43px",
    background: "white",
    padding: "10px",
    marginBottom: "2px",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    paddingLeft: "20px"
  },
  wrapper: {
    height: "100vh",
    "& .MuiButtonBase-root": {
      marginLeft: "15px"
    }
  },
  extendWrapper: { background: "#F5F5F5" },
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
  addButton: {
    display: "flex",
    justifyContent: "end",
    marginRight: "-5px"
  }
}));

const Quiz = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  // States
  const [openDialogQuiz, setOpenDialogQuiz] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState(
    Array(15).fill({ question: "", answer: "" })
  );
  const [validationWarning, setValidationWarning] = useState(0);
  const [dialogType, setDialogType] = useState("create");
  const [quizId, setQuizId] = useState(null);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);

  useEffect(() => {
    context?.getAllQuizzes();
  }, []);

  useEffect(() => {
    if (context?.oneQuiz?.data) {
      setQuestions(context?.oneQuiz?.data?.questions);
      setQuizTitle(context?.oneQuiz?.data?.title);
      setQuizId(context?.oneQuiz?.data?.id);
    }
  }, [context?.oneQuiz?.data]);

  useEffect(() => {
    if (!openDialogQuiz) {
      setQuizTitle("");
      setQuestions(Array(15).fill({ question: "", answer: "" }));
      setValidationWarning(0);
      setDialogType("create");
      context.clearOneQuiz();
    }
  }, [openDialogQuiz]);

  const validateForm = formData => {
    const schema = Yup.object().shape({
      title: Yup.string().required(""),
      questions: Yup.array().of(
        Yup.object().shape({
          question: Yup.string().required(""),
          answer: Yup.string().required("")
        })
      )
    });

    try {
      schema.validateSync(formData, { abortEarly: false });
      return true; // Form data is valid
    } catch (error) {
      return false; // Form data is invalid
    }
  };

  const handleOpenQuizDialog = () => {
    setOpenDialogQuiz(!openDialogQuiz);
  };

  const handleEditClickRow = (event, dataIndex) => {
    setDialogType("edit");
    setQuizTitle(context?.quizzes?.data[dataIndex?.rowIndex]?.title);
    setQuestions(context?.quizzes?.data[dataIndex?.rowIndex]?.questions);
    setQuizId(context?.quizzes?.data[dataIndex?.rowIndex]?.id);
    setOpenDialogQuiz(!openDialogQuiz);
  };

  const handleaddNewOrEditQuiz = () => {
    const body = {
      title: quizTitle,
      questions: questions
    };
    validateForm(body)
      ? dialogType === "create"
        ? context?.createQuiz(body, handleOpenQuizDialog)
        : context?.editQuiz(body, quizId, handleOpenQuizDialog)
      : setValidationWarning(body?.questions?.length);
  };
  const handleGetAllOldQuestions = () => {
    context?.oldQuestions?.data?.length === 0 && context?.getAllOldQuestions();
  };
  const handleOpenWarningDialog = (event, dataIndex) => {
    setQuizId(context?.quizzes?.data[dataIndex?.rowIndex]?.id);
    setOpenWarningDialog(!openWarningDialog);
  };
  const handleDeleteQuiz = () => {
    context?.deleteQuiz(quizId, handleOpenWarningDialog);
  };
  const handlePlay = (event, dataIndex) => {
    const id = context?.quizzes?.data[dataIndex?.rowIndex]?.id;
    navigate(`play/${id}`);
  };

  const contentForAddOrEditQuiz = (
    <DialogContent
      questions={questions}
      setQuestions={setQuestions}
      validationWarning={validationWarning}
      setValidationWarning={setValidationWarning}
      quizTitle={quizTitle}
      setQuizTitle={setQuizTitle}
      handleGetAllOldQuestions={handleGetAllOldQuestions}
      oldQuestions={context?.oldQuestions?.data}
    />
  );

  const columns = [
    {
      name: "title",
      field: "title",
      label: "Title",
      options: {
        sort: false,
        customBodyRender: (value, dataIndex) => {
          return <>{value}</>;
        }
      }
    },
    {
      name: "",
      options: {
        sort: false,
        customBodyRender: (value, dataIndex) => {
          return (
            <div style={{ display: "inline-flex" }}>
              <TooltipIconButton
                tooltipTxt="Play"
                handleClick={event => {
                  event.stopPropagation();
                  handlePlay(event, dataIndex);
                }}
                icon={<PlayCircleOutlineIcon />}
                color="disabled"
              />
              <TooltipIconButton
                tooltipTxt="Delete"
                handleClick={event => {
                  event.stopPropagation();
                  handleOpenWarningDialog(event, dataIndex);
                }}
                icon={<DeleteOutlineIcon />}
                color="disabled"
              />
            </div>
          );
        }
      }
    }
  ];

  const options = {
    filter: false,
    responsive: "standard",
    selectableRows: "none",
    download: false,
    print: false,
    viewColumns: false,
    search: false,
    pagination: false,
    onRowClick: handleEditClickRow,
    customToolbar: () => {
      return (
        <Grid className={classes.addButton}>
          <TooltipIconButton
            tooltipTxt="Add new quiz"
            handleClick={() => handleOpenQuizDialog("create")}
            icon={<AddIcon />}
            color="disabled"
            stayle={{ marginRight: "255px" }}
          />
        </Grid>
      );
    },
    setRowProps: () => ({
      style: { cursor: "pointer" }
    }),
    expandableRows: true,
    renderExpandableRow: (rowData, dataIndex) => {
      return (
        <tr>
          <td colSpan={6} className={classes.extendWrapper}>
            {context?.quizzes?.data[dataIndex?.rowIndex]?.questions?.map(
              (item, index) => (
                <div key={index} className={classes.extendRow}>
                  {item?.question} ({item?.answer})
                </div>
              )
            )}
          </td>
        </tr>
      );
    }
  };

  return (
    <Grid className={classes.wrapper}>
      <Grid className={classes.banner}>
        <Grid>Quiz Maker </Grid>
        <Grid>Total Quizzes: {context?.quizzes?.data?.length}</Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} mx={3} md={12} mt={3}>
          <MUIDataTable
            data={context?.quizzes?.data}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
      <FullScreenDialog
        opened={openDialogQuiz}
        handleClose={handleOpenQuizDialog}
        onAccept={handleaddNewOrEditQuiz}
        content={contentForAddOrEditQuiz}
        title={dialogType === "create" ? "Add New Quiz" : "Edit Quiz"}
        label="save"
      />
      <WarningDialog
        opened={openWarningDialog}
        handleClose={handleOpenWarningDialog}
        onAccept={handleDeleteQuiz}
        content="Are you sure you want to delete this quiz?"
        title="Deleting a quiz"
        acceptLabel="Delete"
      />
    </Grid>
  );
};

export default Quiz;
